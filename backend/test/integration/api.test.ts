import axios from "axios";
import { IAccount } from "../../src/@types";

axios.defaults.validateStatus = function () {
    return true;
}

test("Deve criar um passageiro", async () => {
    const input : IAccount = {
        name: "Thiago Ferreira",
        email: `thiago_ferreira${Math.random()}@gmail.com`,
        cpf: "87748248800",
        password: "123456",
        isPassenger: true
    }

    const response = (await axios.post("http://localhost:3000/signup", input));
    expect(response.status).toBe(201);
    expect(response.data.accountId).toBeDefined();

    const responseAccount = (await axios.get(`http://localhost:3000/account/${response.data.accountId}`)).data;
    expect(responseAccount.name).toBe(input.name);
    expect(responseAccount.cpf).toBe(input.cpf);
    expect(responseAccount.password).toBe(input.password);
    expect(responseAccount.isPassenger).toBe(input.isPassenger);
})

test("Não deve criar um passageiro com nome inválido", async () => {
    const input : IAccount = {
        name: "Thiago",
        email: `thiago_ferreira${Math.random()}@gmail.com`,
        cpf: "877482488",
        password: "123456",
        isPassenger: true
    }

    const response = (await axios.post("http://localhost:3000/signup", input));
    expect(response.status).toBe(422);
    expect(response.data.message).toBe('Nome inválido!');
})