import { Component, OnInit } from '@angular/core';
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

  constructor(private homeService: HomeService) {}

  ngOnInit(): void {
    this.homeService.tag.subscribe((res) => {
      this.listConfig = res;
    });
  }

  setListTo(type: string = '', filters: Object = {}) {
    // If feed is requested but user is not authenticated, redirect to login
    // if (type === 'feed' && !this.isAuthenticated) {
    // if (type === 'feed') {
    // this.router.navigateByUrl('/login');
    // return;
    // }

    // Otherwise, set the list object
    console.log(type);

    // this.feedChange.setFeed(type);
    this.homeService.setTag({ type: type, filters: filters });
  }
}
