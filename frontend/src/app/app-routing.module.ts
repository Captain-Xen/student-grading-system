import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { StudentFormComponent } from './components/student-form/student-form.component';
import { GradeFormComponent } from './components/grade-form/grade-form.component';
import { SummaryComponent } from './components/summary/summary.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'student-form', component: StudentFormComponent },
  { path: 'grade-form', component: GradeFormComponent },
  { path: 'summary', component: SummaryComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
