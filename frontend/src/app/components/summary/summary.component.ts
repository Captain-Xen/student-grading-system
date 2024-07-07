import { Component, OnInit } from '@angular/core';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {
  student: any;
  grades: any[] = [];
  average: number = 0;
  letterGrade: string = '';

  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    // Fetch student and grades data, then calculate average and letter grade
    this.studentService.getStudentById(1).subscribe(student => {
      this.student = student;
      this.studentService.getGradesByStudentId(1).subscribe(grades => {
        this.grades = grades;
        this.calculateAverageAndLetterGrade();
      });
    });
  }

  calculateAverageAndLetterGrade() {
    let total = 0;
    let count = 0;
    this.grades.forEach(subject => {
      total += subject.term1 + subject.term2 + subject.term3;
      count += 3;
    });
    this.average = total / count;

    if (this.average > 90) this.letterGrade = 'A+';
    else if (this.average > 70) this.letterGrade = 'A';
    else if (this.average > 60) this.letterGrade = 'B';
    else if (this.average > 50) this.letterGrade = 'C';
    else this.letterGrade = 'D';
  }
}
