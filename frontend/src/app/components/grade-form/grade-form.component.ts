import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-grade-form',
  templateUrl: './grade-form.component.html',
  styleUrls: ['./grade-form.component.css']
})
export class GradeFormComponent {
  subjects = [
    { name: 'Subject 1', term1: null, term2: null, term3: null },
    { name: 'Subject 2', term1: null, term2: null, term3: null },
    { name: 'Subject 3', term1: null, term2: null, term3: null },
    { name: 'Subject 4', term1: null, term2: null, term3: null },
    { name: 'Subject 5', term1: null, term2: null, term3: null }
  ];

  constructor(private studentService: StudentService, private router: Router) {}

  submitGrades() {
    this.studentService.addGrades(this.subjects).subscribe(response => {
      this.router.navigate(['/summary']);
    });
  }
}
