import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLogin: boolean = false;
  user!: IUser;
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.currentUser().subscribe(data => {
      if (data != null) {
        this.user = data
        this.isLogin = true;
      } else {
        this.user = null as any;
        this.isLogin = false;
      };
    })
  }
}
