import { Component, OnInit } from '@angular/core';
import { Stripe } from '@ionic-native/stripe/ngx';

@Component({
  selector: 'app-stripe',
  templateUrl: './stripe.page.html',
  styleUrls: ['./stripe.page.scss'],
})
export class StripePage implements OnInit {

  paymentAmount: string = '4';
  currency: string = 'EUR';
  currencyIcon: string = '€';
  stripe_key: string = 'pk_test_51IgX4DB88sUXxgZGxA6BzqgwMeO7HNvV8yp5DezcrsnP3FqPuRikS0zJ1LjxhK7XmPhEumbJcwMzBppIX9YKj7dY00b2A1w80a';
  cardDetails: any = {};

  constructor(private stripe: Stripe) { }

  ngOnInit() {
  }

  payWithStripe() {
    // Conecta Stripe SDK usando nuestra clave pública de Stripe
    this.stripe.setPublishableKey(this.stripe_key);

    this.cardDetails = {
      number: '4242424242424242',
      expMonth: 12,
      expYear: 2025,
      cvc: '220'
    }

    this.stripe.createCardToken(this.cardDetails)
      .then(card => {
        console.log('Compra aceptada');
        console.log(card);
        //this.makePayment(token.id);
      })
      .catch(error => console.error(error));
  }

  /*makePayment(token) {
    this.http.post('https://us-central1-shoppr-c97a7.cloudfunctions.net/payWithStripe', {
        amount: 100,
        currency: "usd",
        token: token.id}, 
        {}).then(data => {
        console.log(data);
    });
}*/

}
