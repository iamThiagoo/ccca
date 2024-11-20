export function validateName(name: string) {
    if (!name) return false;
    if (!name.match(/[a-zA-Z] [a-zA-Z]+/)) return false;
    return true;
}

export function validateEmail(email: string) {
    if (!email) return false;
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) return false;
    return true;
}

export function validateCarPlate(carPlate: string) {
    if (!carPlate) return false;
    if (!carPlate.match(/[A-Z]{3}-[0-9]{4}$/)) return false;
    return true;
}
