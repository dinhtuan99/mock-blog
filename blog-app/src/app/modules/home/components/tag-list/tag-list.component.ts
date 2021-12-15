import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Article } from 'src/app/models/articles.model';
import { ArticlesService } from 'src/app/services/articles.service';
import { HomeService } from '../services/home.service';

@Component({
  selector: 'app-tag-list',
  templateUrl: './tag-list.component.html',
  styleUrls: ['./tag-list.component.css'],
})
export class TagListComponent implements OnInit {
  tags: any = [];
  tagsLoaded = false;
  results: Article[] = [];
  listConfig: any = {
    type: 'all',
    filters: {},
  };

  constructor(
    private homeService: HomeService,
    private connectApiService: ArticlesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.homeService.tag.subscribe((res) => {
      this.listConfig = res;
    });
    this.connectApiService.getListArticles().subscribe((data) => {
      if (data) {
        this.tagsLoaded = true;
        data.articles.forEach((el) => this.tags.push(el.tagList));
        this.tags = new Set(this.tags.flat());
      }
    });
  }
  setListTo(type: string = '', filters: any) {
    this.router.navigate(['/'], { queryParams: { tag: filters.tag } });
    this.homeService.setTag({ type: type, filters: filters });
  }
}
