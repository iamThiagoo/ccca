import { validateCpf } from "../helpers/validateCpf";
import AccountDAO from "./dao/AccountDao";
import MailerGateway from "./gateway/MailerGateway";

export interface SignupData {
	saveAccount (account: any): Promise<any>;
	getAccountByEmail (email: string): Promise<any>;
}

export class SignUp {

    constructor (
        readonly accountDAO: AccountDAO, readonly mailerGateway: MailerGateway
    ) {}

    async createAccount(input: any) : Promise<{accountId: string}> {
        if (!this.validateName(input.name)) throw new Error('Nome inválido!');
        if (!validateCpf(input.cpf)) throw new Error('CPF inválido!');
        if (!this.validateEmail(input.email)) throw new Error('Email inválido!');
        if (await this.accountDAO.getAccountByEmail(input.email)) throw new Error('Usuário já existe!');
        if (!input.password) throw new Error('Senha não informada!');
        const id = crypto.randomUUID();
        if (input.isDriver && input.carPlate) {
            if (!this.validateCarPlate(input.carPlate)) throw new Error('Placa do carro inválida!');
        }
        await this.accountDAO.saveAccount({...input, accountId: id});
        return {accountId: id}
    }

    validateName(name: string) {
        if (!name) return false;
        if (!name.match(/[a-zA-Z] [a-zA-Z]+/)) return false;
        return true;
    }
    
    validateEmail(email: string) {
        if (!email) return false;
        if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) return false;
        return true;
    }
    
    validateCarPlate(carPlate: string) {
        if (!carPlate) return false;
        if (!carPlate.match(/[A-Z]{3}-[0-9]{4}$/)) return false;
        return true;
    }    
}