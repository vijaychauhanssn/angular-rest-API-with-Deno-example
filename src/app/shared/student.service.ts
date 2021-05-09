import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Student } from '../model/student.model';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

   constructor(private http: HttpClient) { }

  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(`${environment.apiBaseUrl}/students`)
      .pipe(catchError((error: any) => throwError(error)));
  }
  getStudent(id: number): Observable<Student> {
    return this.http.get<Student>(`${environment.apiBaseUrl}/students/${id}`)
    .pipe(catchError((error: any) => throwError(error)));
  }

  createStudent(payload: Student): Observable<Student> {
    return this.http.post<Student>(`${environment.apiBaseUrl}/students`, payload)
      .pipe(catchError((error: any) => throwError(error)));
  }

  updateStudent(payload: Student): Observable<Student> {
    return this.http.put<Student>(`${environment.apiBaseUrl}/students/${payload.id}`, payload)
      .pipe(catchError((error: any) => throwError(error)));
  }

  removeStudent(payload: Student): Observable<any> {
    return this.http.delete<any>(`${environment.apiBaseUrl}/students/${payload.id}`)
      .pipe(catchError((error: any) => throwError(error)));
  }
}
