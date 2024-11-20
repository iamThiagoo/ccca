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
    expect(responseAccount.is_passenger).toBe(input.isPassenger);
})

test("Não deve criar um passageiro com conta duplicada", async () => {
    const input : IAccount = {
        name: "Thiago Ferreira",
        email: `thiago_ferreira${Math.random()}@gmail.com`,
        cpf: "87748248800",
        password: "1234",
        isPassenger: true
    }

    const response = (await axios.post("http://localhost:3000/signup", input));
    expect(response.status).toBe(201);
    expect(response.data.accountId).toBeDefined();

    const responseDuplicated = (await axios.post("http://localhost:3000/signup", input));
    expect(responseDuplicated.status).toBe(422);
    expect(responseDuplicated.data.message).toBe('Usuário já existe!');
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

test("Não deve criar um passageiro com email inválido", async () => {
    const input : IAccount = {
        name: "Thiago Ferreira",
        email: `thiago_ferreira${Math.random()}@`,
        cpf: "87748248800",
        password: "123456",
        isPassenger: true
    }

    const response = (await axios.post("http://localhost:3000/signup", input));
    expect(response.status).toBe(422);
    expect(response.data.message).toBe('Email inválido!');
})

test("Não deve criar um passageiro com cpf inválido", async () => {
    const input : IAccount = {
        name: "Thiago Ferreira",
        email: `thiago_ferreira${Math.random()}@gmail.com`,
        cpf: "877482488",
        password: "123456",
        isPassenger: true
    }

    const response = (await axios.post("http://localhost:3000/signup", input));
    expect(response.status).toBe(422);
    expect(response.data.message).toBe('CPF inválido!');
})

test("Não deve criar um passageiro com senha não informada", async () => {
    const input : IAccount = {
        name: "Thiago Ferreira",
        email: `thiago_ferreira${Math.random()}@gmail.com`,
        cpf: "87748248800",
        password: "",
        isPassenger: true
    }

    const response = (await axios.post("http://localhost:3000/signup", input));
    expect(response.status).toBe(422);
    expect(response.data.message).toBe('Senha não informada!');
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

    const response = (await axios.post("http://localhost:3000/signup", input));
    expect(response.status).toBe(422);
    expect(response.data.message).toBe('Placa do carro inválida!');
})