import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { HomeService } from '../services/home.service';

@Component({
  selector: 'app-article-feed',
  templateUrl: './article-feed.component.html',
  styleUrls: ['./article-feed.component.css'],
})
export class ArticleFeedComponent implements OnInit {
  listConfig: any = {
    type: 'all',
    filters: {},
  };

  isAuthenticated: boolean = false;
  constructor(
    private homeService: HomeService,
    private userService: UserService,
    private route: Router
  ) {}
  ngOnInit(): void {
    this.homeService.tag.subscribe((res) => {
      this.listConfig = res;
    });
    this.userService.currentUser().subscribe((authenticated) => {
      this.isAuthenticated = !!authenticated;
      this.homeService.tag.subscribe((res) => {
        this.listConfig = res;
      });
    });
  }

  setListTo(type: string = '', filters: Object = {}) {
    this.route.navigate(["/"]);
    if (type === 'feed' && !this.isAuthenticated) {
      this.route.navigateByUrl('/login');
      return;
    }
    this.homeService.setTag({ type: type, filters: filters });
  }
}
