import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime } from 'rxjs/operators';
import { IUser } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLogin: boolean = false;
  user!: IUser;
  selected: string = 'all';

  searchControl = new FormControl();
  constructor(private userService: UserService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.userService.currentUser().subscribe(data => {
      if (data != null) {
        this.user = data;
        if (!this.isValidUrl(this.user.user.image)) {
          this.user.user.image = "https://api.realworld.io/images/smiley-cyrus.jpeg";
        }
        this.isLogin = true;
      } else {
        this.user = null as any;
        this.isLogin = false;
      };
    })
  }

  logout() {
    this.authService.logOut();
  }

  isValidUrl(_string: string) {
    const matchpattern = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/gm;
    return matchpattern.test(_string);
  }

  searchSelected() {
    this.searchControl.reset();
    this.searchControl.valueChanges.pipe(debounceTime(1500)).subscribe(value => {
      if (value) {
        switch (this.selected) {
          case 'tag':
            this.router.navigate(['/'], { queryParams: { tag: value } });
            break;
          case 'author':
            this.router.navigate(['/'], { queryParams: { author: value } });
            break;
          case 'favorited':
            this.router.navigate(['/'], { queryParams: { favorited: value } });
            break;
        }
        this.searchControl.reset();
      } else {
        if (this.selected == 'all') {
          this.router.navigate(['/'], {
            queryParams: {
              'tag': null,
              'author': null,
              'favorited': null
            },
            queryParamsHandling: 'merge'
          });
        }
      }
    })
  }
}
