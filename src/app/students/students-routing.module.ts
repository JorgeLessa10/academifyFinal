import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentsFormComponent } from './students-form/students-form.component';
import { StudentsComponent } from './students/students.component';

const routes: Routes = [
  { path: '', component: StudentsComponent },
  { path: 'addStudent', component: StudentsFormComponent },
  { path: 'editStudent/:id', component: StudentsFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentsRoutingModule { }
