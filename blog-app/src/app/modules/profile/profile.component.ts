import { Component, OnInit } from '@angular/core';
import { IProfile } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  profile!: IProfile;

  constructor(private auth: AuthService, private serviceProfile: UserService) {}

  ngOnInit(): void {
    this.auth.logIn('ngocson@gmail.com', '123456').subscribe((data) => {
      this.getInfor();
    });
  }

  getInfor() {
    this.serviceProfile.getProfile('SonDN22').subscribe((data) => {
      this.profile = data;
      console.log(this.profile);
    });
  }
}
