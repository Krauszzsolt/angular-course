import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CourseDialogComponent } from 'app/course-dialog/course-dialog.component';
import { Course } from 'app/model/course';
import { filter, tap } from 'rxjs/operators';

@Component({
  selector: 'courses-card-list',
  templateUrl: './courses-card-list.component.html',
  styleUrls: ['./courses-card-list.component.scss']
})
export class CoursesCardListComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  @Output()
  private coursesChanged = new EventEmitter();

  @Input()
  courses: Course[] = [] ;

  ngOnInit(): void {
  }

  editCourse(course: Course) {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "400px";

    dialogConfig.data = course;

    const dialogRef = this.dialog.open(CourseDialogComponent, dialogConfig);

    dialogRef.afterClosed()
      .pipe(
        filter(val => !!val),
        tap(() => this.coursesChanged.emit())
      )
      .subscribe();

  }

}
