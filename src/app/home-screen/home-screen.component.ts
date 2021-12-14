import { Component, OnInit } from '@angular/core';
import { StudentsService } from '../students/services/students.service';

@Component({
  selector: 'app-home-screen',
  templateUrl: './home-screen.component.html',
  styleUrls: ['./home-screen.component.css']
})
export class HomeScreenComponent implements OnInit {

  totalStudents: number = 0;

  constructor(private studentService: StudentsService) { }

  ngOnInit(): void {
    this.getTotalStudents();
  }

  getTotalStudents(){
    this.studentService.getTotal().subscribe(value => this.totalStudents = value);
  }

}
