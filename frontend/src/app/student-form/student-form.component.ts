import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StudentService } from '../student.service';
import Swal from 'sweetalert2';
import '@sweetalert2/theme-dark/dark.css';

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

  constructor(private studentService: StudentService, private router: Router) { }

  onSubmit() {
    this.studentService.addStudent(this.student).subscribe(
      response => {
        Swal.fire('Success', 'Student information saved successfully', 'success');
        this.router.navigate(['/student-grades']);
      },
      error => {
        Swal.fire('Error', 'Failed to save student information', 'error');
      }
    );
  }
}
