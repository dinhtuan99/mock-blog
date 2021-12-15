import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { IUser } from 'src/app/models/user.model';
import { HomeService } from 'src/app/modules/home/components/services/home.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  @ViewChild('childModal')
  public childModal!: ModalDirective;

  isLogin: boolean = false;
  user!: IUser;
  selected: string = 'all';

  searchControl = new FormControl();
  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
    private homeService: HomeService
  ) {}

  ngOnInit(): void {
    // this.loadScripts();
    this.userService.currentUser().subscribe((data) => {
      if (data != null) {
        this.user = data;
        if (!this.isValidUrl(this.user.user.image)) {
          this.user.user.image =
            'https://api.realworld.io/images/smiley-cyrus.jpeg';
        }
        this.isLogin = true;
      } else {
        this.user = null as any;
        this.isLogin = false;
      }
    });
  }

  logout() {
    Swal.fire({
      icon: 'question',
      title: 'Are you sure to logout?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      confirmButtonColor: '#fa6342',
      
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.authService.logOut();
        return true 
      } else {
        return false
      }
    })
    
  }

  isValidUrl(_string: string) {
    const matchpattern =
      /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/gm;
    return matchpattern.test(_string);
  }

  home() {
    this.router.navigate(['/']);
    this.homeService.setTag({ type: 'all', filters: {} });
  }

  search() {
    if (this.searchControl.value) {
      switch (this.selected) {
        case 'tag':
          this.router.navigate(['/'], {
            queryParams: { tag: this.searchControl.value },
          });
          break;
        case 'author':
          this.router.navigate(['/'], {
            queryParams: { author: this.searchControl.value },
          });
          break;
        case 'favorited':
          this.router.navigate(['/'], {
            queryParams: { favorited: this.searchControl.value },
          });
          break;
      }
      this.searchControl.reset();
    } else {
      if (this.selected == 'all') {
        this.router.navigate(['/'], {
          queryParams: {
            tag: null,
            author: null,
            favorited: null,
          },
          queryParamsHandling: 'merge',
        });
      }
    }
  }
}
