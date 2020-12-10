import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Course } from '../model/course';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { concatMap, finalize, map, shareReplay, tap } from 'rxjs/operators';

@Injectable()
export class LoadingService {
  private loadingSubject = new BehaviorSubject<boolean>(false);

  loading$: Observable<boolean> = this.loadingSubject.asObservable();

  constructor(){
    console.log("set loading");
  }

  showLoaderUntilCompleted<T>(obs$: Observable<T>): Observable<T> {
   return of(null)
    .pipe(
        tap(() => this.loadingOn()),
        concatMap(() => obs$),
        finalize(() => this.loadingOff())
    );
  }

  loadingOn() {
    console.log('true')
    this.loadingSubject.next(true);
  }
  loadingOff() {
    console.log('false')
    this.loadingSubject.next(false);
  }
}
