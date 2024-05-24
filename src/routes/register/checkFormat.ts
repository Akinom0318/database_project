
export function isValidEmail(input: string): boolean {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(input);
}

export function isValidPhoneNumber(input: string): boolean {
    const phonePattern = /^\+?[0-9]{10,15}$/;
    return phonePattern.test(input);
}