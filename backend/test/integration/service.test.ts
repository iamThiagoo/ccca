import { IAccount } from "../../src/@types";
import { AccountDAODatabase, AccountDAOMemory } from "../../src/classes/dao/AccountDao";
import { MailerGatewayMemory } from "../../src/classes/gateway/MailerGateway";
import GetAccount from "../../src/classes/GetAccount";
import { SignUp } from "../../src/classes/SignUp";
import sinon from "sinon";

let signup: SignUp;
let getAccount: GetAccount;

beforeEach(() => {
    const accountDAO = new AccountDAOMemory();
    // const accountDAO = new AccountDAODatabase();
    const mailerGateway = new MailerGatewayMemory();
    signup = new SignUp(accountDAO, mailerGateway);
    getAccount = new GetAccount(accountDAO);
});

test("Deve criar um passageiro", async () => {
    const input : IAccount = {
        name: "Thiago Ferreira",
        email: `thiago_ferreira${Math.random()}@gmail.com`,
        cpf: "87748248800",
        password: "123456",
        isPassenger: true
    }
    const signupResponse = await signup.createAccount(input);
    const account = await getAccount.getAccountById(signupResponse.accountId);
    expect(account.name).toBe(input.name);
    expect(account.cpf).toBe(input.cpf);
    expect(account.password).toBe(input.password);
    expect(account.isPassenger).toBe(input.isPassenger);
})

test("Não deve criar um passageiro com conta duplicada", async () => {
    const input : IAccount = {
        name: "Thiago Ferreira",
        email: `thiago_ferreira${Math.random()}@gmail.com`,
        cpf: "87748248800",
        password: "1234",
        isPassenger: true
    }

    await signup.createAccount(input);
    await expect(signup.createAccount(input)).rejects.toThrow(new Error('Usuário já existe!'));
})

test("Não deve criar um passageiro com nome inválido", async () => {
    const input : IAccount = {
        name: "Thiago",
        email: `thiago_ferreira${Math.random()}@gmail.com`,
        cpf: "877482488",
        password: "123456",
        isPassenger: true
    }
    await expect(signup.createAccount(input)).rejects.toThrow(new Error('Nome inválido!'));
})

test("Não deve criar um passageiro com email inválido", async () => {
    const input : IAccount = {
        name: "Thiago Ferreira",
        email: `thiago_ferreira${Math.random()}@`,
        cpf: "87748248800",
        password: "123456",
        isPassenger: true
    }
    await expect(signup.createAccount(input)).rejects.toThrow(new Error('Email inválido!'));
})

test("Não deve criar um passageiro com cpf inválido", async () => {
    const input : IAccount = {
        name: "Thiago Ferreira",
        email: `thiago_ferreira${Math.random()}@gmail.com`,
        cpf: "877482488",
        password: "123456",
        isPassenger: true
    }
    await expect(signup.createAccount(input)).rejects.toThrow(new Error('CPF inválido!'));
})

test("Não deve criar um passageiro com senha não informada", async () => {
    const input : IAccount = {
        name: "Thiago Ferreira",
        email: `thiago_ferreira${Math.random()}@gmail.com`,
        cpf: "87748248800",
        password: "",
        isPassenger: true
    }
    await expect(signup.createAccount(input)).rejects.toThrow(new Error('Senha não informada!'));
})

test("Não deve criar um motorista com placa de carro inválida", async () => {
    const input : IAccount = {
        name: "Thiago Ferreira",
        email: `thiago_ferreira${Math.random()}@gmail.com`,
        cpf: "87748248800",
        password: "1234",
        isDriver: true,
        carPlate: "AAA9999"
    }
    await expect(signup.createAccount(input)).rejects.toThrow(new Error('Placa do carro inválida!'));
})

test("Deve criar uma conta de passageiro com stub", async function () {
    const mailerStub = sinon.stub(MailerGatewayMemory.prototype, "send").resolves();
    const accountDAOStub1 = sinon.stub(AccountDAODatabase.prototype, "getAccountByEmail").resolves();
    const accountDAOStub2 = sinon.stub(AccountDAODatabase.prototype, "saveAccount").resolves();
    const input = {
        accountId: "",
        name: "John Doe",
        email: `john.doe${Math.random()}@gmail.com`,
        cpf: "97456321558",
        password: "123456",
        isPassenger: true,
        carPlate: "",
        isDriver: false
    }
    const accountDAOStub3 = sinon.stub(AccountDAODatabase.prototype, "getAccountById").resolves(input);
    const outputSignup = await signup.createAccount(input);
    const outputGetAccount = await getAccount.getAccountById(outputSignup.accountId);
    expect(outputSignup.accountId).toBeDefined();
    expect(outputGetAccount.name).toBe(input.name);
    expect(outputGetAccount.email).toBe(input.email);
    expect(outputGetAccount.cpf).toBe(input.cpf);
    expect(outputGetAccount.password).toBe(input.password);
    expect(outputGetAccount.isPassenger).toBe(input.isPassenger);
    mailerStub.restore();
    accountDAOStub1.restore();
    accountDAOStub2.restore();
    accountDAOStub3.restore();
});

test("Deve criar uma conta de passageiro com spy", async function () {
    const mailerGatewaySpy = sinon.spy(MailerGatewayMemory.prototype, "send");
    const input = {
        name: "John Doe",
        email: `john.doe${Math.random()}@gmail.com`,
        cpf: "97456321558",
        password: "123456",
        isPassenger: true
    }
    const outputSignup = await signup.createAccount(input);
    const outputGetAccount = await getAccount.getAccountById(outputSignup.accountId);
    expect(outputSignup.accountId).toBeDefined();
    expect(outputGetAccount.name).toBe(input.name);
    expect(outputGetAccount.email).toBe(input.email);
    expect(outputGetAccount.cpf).toBe(input.cpf);
    expect(outputGetAccount.password).toBe(input.password);
    expect(outputGetAccount.isPassenger).toBe(input.isPassenger);
    expect(mailerGatewaySpy.calledOnce).toBe(true);
    expect(mailerGatewaySpy.calledWith(input.email, "Welcome", "...")).toBe(true);
});

test("Deve criar uma conta de passageiro com mock", async function () {
    const mailerGatewayMock = sinon.mock(MailerGatewayMemory.prototype);
    const input = {
        name: "John Doe",
        email: `john.doe${Math.random()}@gmail.com`,
        cpf: "97456321558",
        password: "123456",
        isPassenger: true
    }
    mailerGatewayMock.expects("send")
        .withArgs(input.email, "Welcome", "...")
        .once();
    const outputSignup = await signup.createAccount(input);
    const outputGetAccount = await getAccount.getAccountById(outputSignup.accountId);
    expect(outputSignup.accountId).toBeDefined();
    expect(outputGetAccount.name).toBe(input.name);
    expect(outputGetAccount.email).toBe(input.email);
    expect(outputGetAccount.cpf).toBe(input.cpf);
    expect(outputGetAccount.password).toBe(input.password);
    expect(outputGetAccount.isPassenger).toBe(input.isPassenger);
    mailerGatewayMock.verify();
});