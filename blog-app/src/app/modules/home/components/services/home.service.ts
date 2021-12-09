import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class HomeService {
  public constructor() {}

  tag$ = new BehaviorSubject<{}>({ type: 'all', filters: {} });
  tag = this.tag$.asObservable();

  tagName$ = new BehaviorSubject<string>('');
  tagName = this.tagName$.asObservable();

  setTag(value: any) {
    this.tag$.next(value);
  }

  setTagName(value: any) {
    this.tagName$.next(value);
  }
}
