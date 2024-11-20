export interface IAccount {
    name: string;
    email: string;
    cpf: string;
    password: string;
    isDriver?: boolean;
    isPassenger?: boolean;
    carPlate?: string;
}