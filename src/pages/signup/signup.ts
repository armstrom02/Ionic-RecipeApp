import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../Services/auth';


@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private authService: AuthService,
    private alertctrl: AlertController,
    private loadingCtrl: LoadingController) {
  }

  onSignup(form: NgForm) {
    const loading = this.loadingCtrl.create({
      content: 'Sigining you up...'
    });
    loading.present();
    this.authService.signup(form.value.email, form.value.password)
      .then(data => {loading.dismiss();
      })
      .catch(error => {
        loading.dismiss();
        const alert = this.alertctrl.create({
          title:'Signup failed',
          message: error.message,
          buttons: ['ok']
        });
        alert.present();
      });
  }
}
