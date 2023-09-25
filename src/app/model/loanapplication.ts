export interface ILoanApplication {
    id: number,
    productId: number,
    amountRequired: number,
    term: number,
    title: string,
    firstName: string,
    lastName: string,
    dateOfBirth: Date,
    email: string,
    mobile: string
}