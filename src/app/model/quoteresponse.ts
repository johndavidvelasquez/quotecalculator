import { IProduct } from "./product";
import { IProductFee } from "./productfee";

export interface IQuoteResponse {
    product: IProduct,
    fees: IProductFee[],
    amountRequired: number,
    term: number,
    repayment: number,
    totalInterest: number
}