import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
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
  checkFollow!: boolean;
  constructor(
    private auth: AuthService,
    private serviceProfile: UserService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap((data) => {
          return this.getProfile(data.username);
        })
      )
      .subscribe((data) => {
        this.profile = data;
        this.checkFollow = data.profile.following;
        
        
      });
  }

  getProfile(username: string) {
    if (!localStorage.getItem('currentUser'))
      return this.serviceProfile.getProfile(username);
    return this.serviceProfile.getProfileWithToken(username);
  }

  follow(userName: string): void {
    this.serviceProfile.followUser(userName).subscribe((data) => {
      this.checkFollow = data.profile.following;
      

      
    });
  }

  unFollow(userName: string): void {
    this.serviceProfile.unfollowUser(userName).subscribe((data) => {
      this.checkFollow = data.profile.following;
      
    });
  }
}
