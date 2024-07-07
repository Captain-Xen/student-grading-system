import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.css']
})
export class StudentFormComponent {
  student = {
    student_id: '',
    name: '',
    class: '',
    age: null
  };

  constructor(private studentService: StudentService, private router: Router) {}

  submitStudent() {
    this.studentService.addStudent(this.student).subscribe(response => {
      this.router.navigate(['/grade-form']);
    });
  }
}
