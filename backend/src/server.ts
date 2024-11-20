import express from "express";
import { createAccount, getUserById } from "./account";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

app.post("/signup", async function (req, res) {
	try {
		const input = req.body;
		const response = await createAccount(input);
		return res.status(201).json(response);
	} catch (error: unknown) {
		console.log('Ocorreu um erro ao cadastrar o usuário', error);
		if (error instanceof Error) {
			return res.status(422).json({ message: error.message });
		}
		return res.status(500).json({ message: 'Erro desconhecido' });
	}
});

app.get('/account/:id', async function (req, res) {
	const id = req.params.id
	const account : any = await getUserById(id)

	if (!account[0]) {
		res.status(404).json({
			message: 'Usuário não encontrado!'
		})
	}

	res.json(account[0])
})

app.listen(3000);
console.log('Server is running on port 3000');
