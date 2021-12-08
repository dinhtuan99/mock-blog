import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IUser, IUserUpdate } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  currentUser!: IUser;
  settingsForm!: FormGroup;
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    this.settingsForm = this.fb.group({
      imageUrl: this.fb.control(''),
      username: this.fb.control(''),
      bio: this.fb.control(''),
      email: this.fb.control(''),
      password: this.fb.control(''),
    })
    this.userService.getCurrentUser().subscribe(data => {
        this.currentUser =  data;
        this.settingsForm.patchValue({
          imageUrl: this.currentUser.user.image,
          username: this.currentUser.user.username,
          bio: this.currentUser.user.bio,
          email: this.currentUser.user.email
        })
      })
  }

  submitForm() {
    const userUpdate : IUserUpdate = {
      user: {
        email: this.settingsForm.value.email,
        bio: this.settingsForm.value.bio,
        image: this.settingsForm.value.imageUrl,
        password: this.settingsForm.value.password,
        username: this.settingsForm.value.username
      }
    };
    this.userService.updateUser(userUpdate).subscribe(data => {
      this.router.navigate(['profile', data.user.username])
    });
  }

  logout(){
    this.authService.logOut();
  }
}
