import { IAccount } from "./@types";
import { createDriverAccount, createPassengerAccount, userExists } from "./accountDatabase";
import { validateCarPlate, validateEmail, validateName } from "./helpers/validate";
import { validateCpf } from "./helpers/validateCpf";

export async function createAccount(input: IAccount) : Promise<{accountId: string}> {
    if (!validateName(input.name)) throw new Error('Nome inválido!');
    if (!validateCpf(input.cpf)) throw new Error('CPF inválido!');
    if (!validateEmail(input.email)) throw new Error('Email inválido!');
    if (await userExists(input.email)) throw new Error('Usuário já existe!');
    const id = crypto.randomUUID();
    if (input.isDriver && input.carPlate) {
        if (!validateCarPlate(input.carPlate)) {
            throw new Error('Placa do carro inválida!');
        }
        await createDriverAccount(id, input);
    } else {
        await createPassengerAccount(id, input);
    }
    return {accountId: id}
}

export async function getAccountById(id: string) : Promise<IAccount | undefined> {
    return await getAccountById(id);
}
