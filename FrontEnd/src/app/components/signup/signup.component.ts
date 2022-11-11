import { Component, OnInit, Optional } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { SignupLoginService } from '../../service/signup-login.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {

  constructor(
    private toast : NgToastService ,
    private signUpService : SignupLoginService ,
    private router : Router) { }

  ngOnInit(): void { }

  signUpForm = new FormGroup({
    fullName : new FormControl('',[Validators.required ,Validators.minLength(3),Validators.maxLength(70)]),
    emailId : new FormControl('',[Validators.required , Validators.pattern("^[a-z0-9._%+-]+@[a-z.-]+\\.[a-z]{2,4}$")]),
    mobileNo : new FormControl('',[Validators.required , Validators.minLength(10),Validators.maxLength(10) ]),
    password : new FormControl('',[Validators.required ]),
    confirmPassword : new FormControl('',[Validators.required ]),
    role : new FormControl('User')
  })

  saveUser() {
    if(this.signUpForm.value.password == this.signUpForm.value.confirmPassword) {
    this.signUpService.userSignup(this.signUpForm.value)
    .subscribe(response => {
         console.log(this.signUpForm.value);
         this.toast.success({detail:'Signup Successful .....',duration:4000});
         this.router.navigate(['']);
        },
      error => {
        console.log(this.signUpForm.value);
        this.toast.error({detail:'Something Went wrong ..',summary:error,duration:10000});
      })}
      else {
      this.toast.warning({detail:'password mismatch...',duration:5000});
    }}

  get fullName() {
    return this.signUpForm.get('fullName');
  }

  get emailId() {
    return this.signUpForm.get('emailId');
  }

  get mobileNo() {
    return this.signUpForm.get('mobileNo');
  }

  get password() {
    return this.signUpForm.get('password');
  }

  get confirmPassword() {
    return this.signUpForm.get('confirmPassword');
  }
}
