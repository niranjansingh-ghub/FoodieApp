import { Component, Input, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';
import { FavouriteService } from './../../service/favourite.service';
import { HttpClient } from '@angular/common/http';
import { ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SignupLoginService } from 'src/app/service/signup-login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {
  @ViewChild('myModalClose') modalClose: any;

  userLoggedIn: any;

  constructor(
    private router: Router,
    private toast: NgToastService,
    private favourite: FavouriteService,
    private http: HttpClient,
    private login: SignupLoginService) { }

  userName: string;
  userEmail: any;

  pictureName: File;
  profileUrl: File;

  location: string;

  public isLoggedIn = false;

  login_SignUpButton: boolean = true;
  profileButton: boolean = false;

  filterData: any;

  ngOnInit(): void {
    if (window.localStorage.getItem('isLoggedIn') == 'success') {
      this.login_SignUpButton = false;
      this.profileButton = true;
    }
    this.checkLogin();
  }

  loginForm = new FormGroup({
    emailId: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  })

  loginUser() {
    this.login.userLogin(this.loginForm.value)
      .subscribe(res => {
          this.login_SignUpButton = true;
          this.toast.success({ detail: 'Login Successfull..', duration: 4000 })

          window.localStorage.setItem('tokenKey', res.token);
          window.localStorage.setItem('userEmail', this.loginForm.value.emailId);
          window.localStorage.setItem('userName', res.user);
          window.localStorage.setItem('userRole', res.role);


          window.localStorage.setItem('isLoggedIn', 'success');
          this.modalClose.nativeElement.click();
          this.userLoggedIn = true;
          if (window.localStorage.getItem('isLoggedIn') == 'success') {
            this.login_SignUpButton = false;
            this.profileButton = true;
          }
          if (res.role == 'User') {
          this.checkLogin();
          console.log(window.localStorage.getItem('tokenKey'),window.localStorage.setItem('userRole', res.role)
          );
          
          this.router.navigateByUrl('/restaurant');
          this.location=prompt("Enter your Location");
          window.localStorage.setItem('location', this.location);
          console.log(this.location);
          window.location.reload();
        }
        else {
          console.log(window.localStorage.getItem('tokenKey'));
          this.checkLogin();
          this.router.navigate(['/admin'])
        }},
        err => {
          this.toast.error({ detail: 'Invalid Credentials', summary: 'Are you sure you have registered..?', duration: 4000 })
        })
  }

  get emailId() {
    return this.loginForm.get('emailId');
  }

  get password() {
    return this.loginForm.get('password');
  }

  checkLogin() {
    this.userName = window.localStorage.getItem('userName');
    this.userEmail = window.localStorage.getItem('userEmail');

    if (window.localStorage.getItem('userEmail') != null) {
          this.getImage();
    }
  }

  saveProfile(event: any) {
    if (event.target.files) {
      this.pictureName = <File>event.target.files[0];
    }
  }

  onUpload() {
    const fd = new FormData();
    fd.append('imageFile', this.pictureName, this.userEmail)
    this.http.post<any>('http://localhost:9000/foodieApp/profile/upload', fd)
      .subscribe(res => {
        console.log(res);
        this.toast.success({ detail: 'Profile picture uploaded successfuly..', duration: 4000 });
        this.getImage();
      },
        error => {
          this.toast.error({ detail: 'Error uploading picture..', duration: 4000 });
        })
  }

  getImage() {
    this.http.get<any>('http://localhost:9000/foodieApp/profile/image/' + this.userEmail)
      .subscribe(res => {
        this.profileUrl = res.url;
      },
        error => {
          if (error.status == 200) {
            this.profileUrl = error.url;
          }
          else {
            this.profileUrl = null;
          }
        })
      }

  logoutUser() {
    this.login_SignUpButton = true;
    this.profileButton = false;
    window.localStorage.clear();
    window.sessionStorage.clear();
    this.toast.success({ detail: 'Logout Successful !!!', duration: 5000 });
    this.router.navigateByUrl('/restaurant');
  }

  goToAdmin(){
    console.log(window.sessionStorage.getItem('userRole'));
    
    if(window.localStorage.getItem('userRole')=='User'){
      this.toast.success({ detail: 'You Are Not an Admin.', duration: 5000 })
      
    }
    else{
      this.router.navigate(['/admin'])
    }
  }

}
