import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ILoanApplication } from 'src/app/model/loanapplication';
import { QuoteService } from 'src/app/services/quote.service';
import { IQuoteRequest } from 'src/app/model/quoterequest';
import { IQuoteResponse } from 'src/app/model/quoteresponse';
import { Message, MessageService } from 'primeng/api';



@Component({
  selector: 'app-reviewquote',
  templateUrl: './reviewquote.component.html',
  styleUrls: ['./reviewquote.component.css'],
  providers: [MessageService]
})
export class ReviewquoteComponent {

  applicationDetails: ILoanApplication | any;
  quoteSummary: IQuoteResponse | any;

  constructor(
    private quoteService: QuoteService,
    private formbuilder: FormBuilder,
    private router: Router,
    private messageService: MessageService) { }

  ngOnInit() {
    if (!localStorage.getItem('quoteForm')) {
      this.router.navigateByUrl('/');
    }

    var lsResults = JSON.parse(localStorage.getItem('quoteForm') || '{}');
    this.applicationDetails = lsResults as ILoanApplication;

    this.quoteSummary = {};
    console.log("APP DETAILS", this.applicationDetails);


    var calculateReq: IQuoteRequest = { amountRequired: this.applicationDetails.amountRequired, term: this.applicationDetails.term };

    this.quoteService.calculateQuote(this.applicationDetails.productId, calculateReq).subscribe((result) => {
      if (result != null) {
        console.log("Quote b4", this.quoteSummary);
        this.quoteSummary = result;
        console.log("Quote after", this.quoteSummary);
      }
    });


    console.log(this.applicationDetails);
  }


  apply() {
    this.quoteService.applyLoan(this.applicationDetails).subscribe((result) => {
      localStorage.removeItem('quoteForm');
      this.router.navigateByUrl('/success');
    },
    (error) => {
      console.log("ERR",error);
      if(error.status == 422)
      {
        console.log("ERRORS",error.error);
        for (let [key, value] of Object.entries(error.error)) {
          console.log(key, value);
          this.messageService.add({severity:'error', summary:`Error in ${key} field`, detail: `${value}`});
        }
      }
    });
    console.log("YES", this.applicationDetails);
  }


  editDetails() {
    console.log(this.applicationDetails);
    this.router.navigateByUrl(this.applicationDetails.id ? `quote/${this.applicationDetails.id}` : '/quote');
  }




}
