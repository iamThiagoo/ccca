import pgPromise from "pg-promise";
import { IAccount } from "./@types";

export async function userExists(Email: string) : Promise<boolean> {
    const connection = pgPromise()("postgres://postgres:root@localhost:5432/app");
    const [account] = await connection.query("SELECT * FROM accounts WHERE email = $1", [Email]);
    await connection.$pool.end();
    return account !== undefined;
}

export async function createDriverAccount(id: string, input: IAccount) : Promise<void> {
    const connection = pgPromise()("postgres://postgres:root@localhost:5432/app");
    await connection.query("INSERT INTO accounts (account_id, name, email, cpf, car_plate, is_passenger, is_driver, password) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)", [id, input.name, input.email, input.cpf, input.carPlate, !!input.isPassenger, !!input.isDriver, input.password]);
    await connection.$pool.end();
}

export async function createPassengerAccount(id: string, input: IAccount) : Promise<void> {
    const connection = pgPromise()("postgres://postgres:root@localhost:5432/app");
    await connection.query("INSERT INTO accounts (account_id, name, email, cpf, car_plate, is_passenger, is_driver, password) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)", [id, input.name, input.email, input.cpf, input.carPlate, !!input.isPassenger, !!input.isDriver, input.password]);
    await connection.$pool.end();
}

export async function getAccountById(id: string) : Promise<IAccount | undefined> {
    const connection = pgPromise()("postgres://postgres:root@localhost:5432/app");
    const account = await connection.query<IAccount>("SELECT * FROM accounts WHERE account_id = $1", [id]);
    await connection.$pool.end();
    return account;
}