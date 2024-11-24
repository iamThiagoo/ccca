import express from "express";
import cors from "cors";
import { SignUp } from "./classes/SignUp";
import { MailerGatewayMemory } from "./classes/gateway/MailerGateway";
import GetAccount from "./classes/GetAccount";
import { AccountDAODatabase } from "./classes/dao/AccountDao";

const app = express();
app.use(express.json());
app.use(cors());

app.post("/signup", async function (req, res) {
	try {
		const accountDAO = new AccountDAODatabase();
		const mailerGateway = new MailerGatewayMemory();
		const signup = new SignUp(accountDAO, mailerGateway);

		return res.status(201).json(await signup.createAccount(req.body));
	} catch (error: unknown) {
		if (error instanceof Error) return res.status(422).json({ message: error.message });
		return res.status(500).json({ message: 'Erro desconhecido' });
	}
});

app.get('/account/:id', async function (req, res) {
	const accountDAO = new AccountDAODatabase();
	const getAccount = new GetAccount(accountDAO);

	const account : any = await getAccount.getAccountById(req.params.id)
	res.json(account)
})

app.listen(3000);
console.log('Server is running on port 3000');
