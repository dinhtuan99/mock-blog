import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  loginForm! : FormGroup;
  constructor(private fb : FormBuilder, private authService : AuthService, private router : Router ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: this.fb.control('', Validators.required),
      password: this.fb.control('', Validators.required),
    })
  }

  submitForm(){
    this.authService.logIn(this.loginForm.value.email, this.loginForm.value.password).subscribe(user => {
      this.router.navigate(['../'])
    })
  }
}
