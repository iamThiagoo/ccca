import { validateCarPlate, validateEmail, validateName } from "../src/helpers/validate";

// Name
test.each([
    "Thiago Ferreira", 
    "Thiago Ferreira da Silva Júnior",
    "thiago ferreira"
])("Deve validar o nome do usuário %s", function (name: any) {
    const isValid = validateName(name);
    expect(isValid).toBe(true);
});

test.each([
    null,
    undefined,
    "",
    "Thiago"
])("Não deve validar o nome do usuário %s", function (name: any) {
    const isValid = validateName(name);
    expect(isValid).toBe(false);
});


// Email
test.each([
    "thiago@gmail.com",
    "thiago.ferreira@gmail.com",
    "thiago+ferreira@gmail.com"
])("Deve validar o email %s", function (email: any) {
    const isValid = validateEmail(email);
    expect(isValid).toBe(true);
});

test.each([
    null,
    undefined,
    "",
    "thiagoferreiragmail.com",
    "thiago@gmail"
])("Não deve validar o email %s", function (email: any) {
    const isValid = validateEmail(email);
    expect(isValid).toBe(false);
});


// Car Plate
test.each([
    "ABC-1234",
    "TCP-0225",
    "RCP-4311"
])("Deve validar a placa do carro %s", function (carPlate: any) {
    const isValid = validateCarPlate(carPlate);
    expect(isValid).toBe(true);
});

test.each([
    null,
    undefined,
    "",
    "ABC-123",
    "ABC1234",
    "RCP-43121",
    "1234-rcp"
])("Não deve validar a placa do carro %s", function (carPlate: any) {
    const isValid = validateCarPlate(carPlate);
    expect(isValid).toBe(false);
});
