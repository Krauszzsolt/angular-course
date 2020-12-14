import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { Course, sortCoursesBySeqNo } from '../model/course';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { LoadingService } from 'app/loading/loading.service';
import { MessagesService } from 'app/messages/messages.service';

@Injectable({
  providedIn: 'root',
})
export class CoursesStore {
  constructor(private http: HttpClient, private loading: LoadingService, private message: MessagesService) {
    this.loadAllCourses();
  }

  private subject = new BehaviorSubject<Course[]>([]);

  courses$: Observable<Course[]> = this.subject.asObservable();

  private loadAllCourses() {
    const loadCourses$ = this.http.get<Course[]>('/api/courses').pipe(
      map((response) => response['payload']),
      catchError((err) => {
        const message = 'Could not load courses';
        this.message.showErrors(message);
        console.log(message, err);
        return throwError(err);
      }),
      tap((courses) => {
        this.subject.next(courses)
      })
    );

    this.loading.showLoaderUntilCompleted(loadCourses$).subscribe();
  }

  public filterByCategory(category: string): Observable<Course[]> {
    return this.courses$.pipe(     
      map((courses) =>
        courses
          .filter((course) => 
            course.category == category
          )
          .sort(sortCoursesBySeqNo)          
      )
    );
  }
}
