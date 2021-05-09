import { StudentService } from './../shared/student.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../model/student.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  students$: Observable<Student[]>;
  displayedColumns: string[] = ['id', 'firstname', 'lastname', 'email', 'action'];

  constructor(private service: StudentService) { }

  ngOnInit() {
    this.students$ = this.service.getStudents();
  }

}
