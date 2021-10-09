import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Country } from 'src/app/common/country';
import { State } from 'src/app/common/state';
import { CartService } from 'src/app/services/cart.service';
import { EcommerceFormService } from 'src/app/services/ecommerce-form.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  checkoutFormGroup: FormGroup;
  totalPrice: number = 0;
  totalQuantity: number = 0;

  creditCardMonths: number[] = [];
  creditCardYears: number[] = [];

  countries: Country[] = [];
  shippingAddressStates: State[] = [];
  billingAddressStates: State[] = [];

  constructor(private formBuilder: FormBuilder,
              private ecommerceFormService: EcommerceFormService,
              private cartService: CartService) { }

  ngOnInit(): void {

    this.reviewCartDetails();
    
    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: new FormControl('', [Validators.required, Validators.minLength(2)]),
        lastName: new FormControl('', [Validators.required, Validators.minLength(2)]),
        email: new FormControl('', 
                [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')])
      }),
      shippingAddress: this.formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        country: [''],
        zipcode: ['']
      }), 
      billingAddress: this.formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        country: [''],
        zipcode: ['']
      }),
      creditCard: this.formBuilder.group({
        cardType: [''],
        nameOnCard: [''],
        cardNumber: [''],
        securityCode: [''],
        expirationMonth: [''],
        expirationYear: ['']
      })          
    });

    const currentMonth: number = new Date().getMonth() + 1;
    console.log(currentMonth);

    this.ecommerceFormService.getCreditCardMonths(currentMonth).subscribe(
      data => {
        console.log('Months data retrieved...');
        this.creditCardMonths = data;
      }
    );

    this.ecommerceFormService.getCreditCardYears().subscribe(
      data => {
        console.log('Retirved Years data...');
        this.creditCardYears = data;
      }
    );

    this.ecommerceFormService.getCountries().subscribe(
      data => {
        console.log('Retrieved Countries ........');
        this.countries = data;
      }
    );
  }
  reviewCartDetails() {
    this.cartService.totalQuantity.subscribe(
      data => {
        this.totalQuantity = data
      }
    );

    this.cartService.totalPrice.subscribe(
      data => {
        this.totalPrice = data
      }
    );
  }

  get firstName() {
    return this.checkoutFormGroup.get('customer.firstName ');
  }

  get lastName() {
    return this.checkoutFormGroup.get('customer.lastName ');
  }

  get email() {
    return this.checkoutFormGroup.get('customer.email ');
  }

  onFormSubmit() {

    if (this.checkoutFormGroup.invalid) {
      console.log('Inside the invalid function........')
      this.checkoutFormGroup.markAllAsTouched();
    }

    console.log('Handling the submit button');
    console.log(this.checkoutFormGroup.get('customer')!.value);
  }

  copyShippingToBillingAddress(event: any) {

    if (event.target.checked) {
      this.checkoutFormGroup.controls.billingAddress
              .setValue(this.checkoutFormGroup.controls.shippingAddress.value);
      
      this.billingAddressStates = this.shippingAddressStates;
    }
    else {
      this.checkoutFormGroup.controls.billingAddress.reset();
    }
  }

  handleYearsAndMonths() {
    const creditCardGroup = this.checkoutFormGroup.get('creditCard');

    const currentYear: number = new Date().getFullYear();
    const selectedYear: number = Number(creditCardGroup?.value.expirationYear);

    let startMonth: number;

    if (currentYear === selectedYear) {
      startMonth = new Date().getMonth() + 1;
    }
    else{
      startMonth = 1;
    }

    this.ecommerceFormService.getCreditCardMonths(startMonth).subscribe(
      data => {
        console.log('Retrieved the month ater change event...');
        this.creditCardMonths = data;
      }
    );
  }

  getStates(formGroupName: string) {
    const formGroup = this.checkoutFormGroup.get(formGroupName);
    const selectedCountryCode = formGroup?.value.country.code;

    this.ecommerceFormService.getStates(selectedCountryCode).subscribe(
      data => {
        if(formGroupName === 'shippingAddress') {
          this.shippingAddressStates = data;
        }
        else {
          this.billingAddressStates = data;
        }
        formGroup?.get('state')?.setValue(data[0]);
      }
    );

  }

}
