import { AfterViewInit, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from '../model/student';
import { StudentsService } from '../services/students.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StudentModalComponent } from '../student-modal/student-modal.component';


@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit, AfterViewInit {

  students: Student[] = [];
  studentsDataSource= new MatTableDataSource();
  displayedColumns = ['name', 'enrollment', 'birthDate', 'actions'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private studentsService: StudentsService, 
    private router: Router, 
    private route: ActivatedRoute,
    private dialog: MatDialog) { 
  }
  ngAfterViewInit(): void {
    this.studentsDataSource.paginator = this.paginator;
    this.studentsDataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.getStudents();
    this.studentsDataSource.data = this.students;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.studentsDataSource.filter = filterValue.trim().toLowerCase();
    if (this.studentsDataSource.paginator) {
      this.studentsDataSource.paginator.firstPage();
    }
  }

  getStudents() {  
    this.studentsService.getStudents().subscribe(value => {      
      for (let st in value) {               
        let student = {} as Student;
        student.id = value[st].id.toString();
        student.enrollment = value[st].matricula;
        student.name = value[st].nome;
        student.birthDate = value[st].nascimento;
        student.registrationDate = value[st].dataHoraCadastro;
        this.students.push(student);        
      }
      this.studentsDataSource.data = this.students;
    })
  }

  onRefresh() {
    this.students = []; 
    this.getStudents();
  }

  onEdit(id:number){
    this.router.navigate(['editStudent', id], {relativeTo: this.route});
  }

  onDelete(student: any){
    this.studentsService.removeStudents(student).subscribe(
      success =>  this.onRefresh(),
      error => console.log(error),
      () => console.log('Request complete')
    );      
  }

  openDialog(id: string) {
    let stdt = {} as Student | undefined;
    stdt = this.students.find(st => st.id === id);    
    this.dialog.open(StudentModalComponent, {
      data: {
        name: stdt?.name,
        enrollment: stdt?.enrollment,
        birthDate: stdt?.birthDate ? new Date(stdt?.birthDate).toLocaleString('pt-BR') : stdt?.birthDate,
        registrationDate: stdt?.registrationDate  ? new Date(stdt?.registrationDate).toLocaleString('pt-BR') : stdt?.registrationDate
      }      
    });
  }

}
