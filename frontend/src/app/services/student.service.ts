import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private apiUrl = 'http://localhost:5000/api/students';

  constructor(private http: HttpClient) { }

  addStudent(student: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/add`, student);
  }

  getStudentById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  addGrades(grades: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/grades`, grades);
  }

  getGradesByStudentId(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/grades/${id}`);
  }
}
