export const isValidEmail = (email: string) => {
    const validatedEmail = /\S+@\S+\.\S+/.test(email);
    return validatedEmail;
}