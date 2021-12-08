import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-favoritePost',
  templateUrl: './favoritePost.component.html',
  styleUrls: ['./favoritePost.component.css']
})
export class FavoritePostComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      console.log(params);
    })
  }

}
