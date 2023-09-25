import { Injectable } from '@angular/core';
import { IProduct } from '../model/product';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { IQuoteResponse } from '../model/quoteresponse';
import { IQuoteRequest } from '../model/quoterequest';
import { ILoanApplication } from '../model/loanapplication';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QuoteService {

  baseUrl: string = environment.apiUrl;
  constructor(private http: HttpClient) { }

  getProducts(): Observable<IProduct[]> {
    return this.http
      .get<IProduct[]>(`${this.baseUrl}/quote/products`)
      .pipe(
        retry(3) //, // retry a failed request up to 3 times
        //catchError(this.handleError) // then handle the error
      );
  }

  getLoanApplication(id:number): Observable<ILoanApplication> {
    return this.http
      .get<ILoanApplication>(`${this.baseUrl}/Quote/loanapplications/${id}`)
      .pipe(
        retry(3) //, // retry a failed request up to 3 times
        //catchError(this.handleError) // then handle the error
      );
  }

  calculateQuote(productId:number, req:IQuoteRequest): Observable<IQuoteResponse> {
    return this.http
      .post<IQuoteResponse>(`${this.baseUrl}/quote/calculate/${productId}`, req)
      .pipe(
        retry(3) //, // retry a failed request up to 3 times
        //catchError(this.handleError) // then handle the error
      );
  }

  applyLoan(req:ILoanApplication): Observable<any> {
    return this.http
      .post<any>(`${this.baseUrl}/quote/loanapplications/`, req)
      .pipe(
        //retry(3) //, // retry a failed request up to 3 times
        //catchError(this.handleError) // then handle the error
      );
  }
  

}
