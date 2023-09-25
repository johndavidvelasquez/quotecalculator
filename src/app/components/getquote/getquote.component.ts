import { Component, OnInit } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { Options } from 'ngx-slider-v2';
import { QuoteService } from 'src/app/services/quote.service';
import { IProduct } from 'src/app/model/product';
import { ILoanApplication } from 'src/app/model/loanapplication';
import { FormGroup, FormControl, FormBuilder, Validators, ValidationErrors } from '@angular/forms';
import { formatDate } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Message, MessageService } from 'primeng/api';


@Component({
  selector: 'app-getquote',
  templateUrl: './getquote.component.html',
  styleUrls: ['./getquote.component.css'],
  providers: [MessageService]
})
export class GetquoteComponent {

  constructor(
    private quoteService: QuoteService,
    private formbuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService
  ) { }

  products: IProduct[] | any;
  selectedProduct: IProduct | any;
  applicationDetails: ILoanApplication | any;

  titleOptions: string[] = ['Mr.','Ms.','Mrs.'];

  amountValue: number = 0;
  repaymentValue: number = 0;

  amountOptions: Options = {
    floor: 300,
    ceil: 10000,

    translate: (value: number): string => {
      return '$' + value;
    },
  };

  repaymentOptions: Options = {
    floor: 2,
    ceil: 36,

    translate: (value: number): string => {
      return value + ' months';
    },
  };

  //          Validators.maxLength(50),
  // Validators.pattern('^[a-zA-Z ]*$')

  quoteForm = this.formbuilder.group({
    id: this.formbuilder.control<number | null>(null),
    productId: this.formbuilder.control<number | null>(null, [Validators.required]),
    amountRequired: this.formbuilder.control<number | null>(null, [Validators.required]),
    term: this.formbuilder.control<number | null>(null, [Validators.required]),
    title: ["", Validators.required],
    firstName: ["", [Validators.required, Validators.maxLength(100), Validators.pattern('^[a-zA-Z \-\']+')]],
    lastName: ["", [Validators.required, Validators.maxLength(100), Validators.pattern('^[a-zA-Z \-\']+')]],
    dateOfBirth: [new Date(), Validators.required],
    mobile: ["", Validators.required],
    email: ["", [Validators.required, Validators.email]]
  });

  ngOnInit() {

    console.log(this.applicationDetails);

    this.route.params.subscribe(params => {
      var applicationId = +params['id'];
      console.log(applicationId);

      if(applicationId) {
          // get application details
          this.quoteService.getLoanApplication(applicationId).subscribe((result) => {
            if (result != null) {
                console.log(result);
                // Update form values
                this.quoteForm.patchValue({
                  id: applicationId,
                  title: result.title,
                  firstName: result.firstName, 
                  lastName: result.lastName,
                  dateOfBirth: new Date(result.dateOfBirth),//formatDate(new Date("1900-01-01"), "yyyy-MM-dd", "en"),
                  mobile : result.mobile,
                  email : result.email,
                  amountRequired: result.amountRequired,
                  term: result.term
                });
            }
          });
      }
   });

    this.quoteService.getProducts().subscribe((result) => {
      if (result != null) {
        this.products = result;
        if (localStorage.getItem('quoteForm')) {
          var lsResults = JSON.parse(localStorage.getItem('quoteForm') || '{}');
          this.applicationDetails = lsResults as ILoanApplication;
    
          console.log("UPDATE", this.applicationDetails);
    
          this.quoteForm.patchValue({
            id: this.applicationDetails.id,
            title: this.applicationDetails.title,
            firstName: this.applicationDetails.firstName, 
            lastName: this.applicationDetails.lastName,
            dateOfBirth: new Date(this.applicationDetails.dateOfBirth),//formatDate(new Date("1900-01-01"), "yyyy-MM-dd", "en"),
            mobile : this.applicationDetails.mobile,
            email : this.applicationDetails.email,
            amountRequired: this.applicationDetails.amountRequired,
            term: this.applicationDetails.term,
            productId: this.applicationDetails.productId
          });
    
          this.selectedProduct = this.products.find((x :any) => x.id == this.applicationDetails.productId);
    
        }
      }
    });



  }

  productSelectChanged() {
    if (this.selectedProduct != null) {

      // Due to change detection rules in Angular, we need to re-create the options object to apply the change
      const newOptionsAmount: Options = Object.assign({}, this.amountOptions);
      newOptionsAmount.ceil = this.selectedProduct?.maxAmount;
      newOptionsAmount.floor = this.selectedProduct?.minAmount;
      this.amountOptions = newOptionsAmount;

      const newOptionsRepayment: Options = Object.assign({}, this.repaymentOptions);
      newOptionsRepayment.ceil = this.selectedProduct?.maxMonth;
      newOptionsRepayment.floor = this.selectedProduct?.minMonth;
      this.repaymentOptions = newOptionsRepayment;

      // this.amountValue = this.selectedProduct?.maxAmount / 3;

      this.quoteForm.patchValue({
        productId: this.selectedProduct.id
      });

    }
  }

  calculate() {
    console.log(this.quoteForm);
    if(this.quoteForm.invalid)
    {
      Object.keys(this.quoteForm.controls).forEach((key:any) => {
        const controlErrors: any = this.quoteForm.get(key)?.errors;
        if (controlErrors != null) {       
           Object.keys(controlErrors).forEach(keyError => {
              if(keyError == "required")
              {
                  if(key == "productId")
                    this.messageService.add({severity:'error', summary:`Please select a product`});
                  else
                    this.messageService.add({severity:'error', summary:`${key} is required`});
              }
            });
        }
      });
    }

    else
    {
      console.log(this.quoteForm.value);
      localStorage.setItem('quoteForm', JSON.stringify(this.quoteForm.value));

      console.log('quoteForm: ', JSON.parse(localStorage.getItem('quoteForm') || '{}'));
      this.router.navigateByUrl('/review');
    }

  }

  numberOnly(event: any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }

  
}
