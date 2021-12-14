import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Student } from '../model/student';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  constructor(private httpClient: HttpClient) { }

  API_URI = 'http://localhost:8080/api/aluno/';

  getStudents(): Observable<any>{
    return this.httpClient.get(this.API_URI+'listar');
  }
  
  getStudentById(id: number){
    return this.httpClient.get(`${this.API_URI}get/${id}`);

  }

  addStudents(student: any){
    return this.httpClient.post(this.API_URI+'incluir', student).pipe(take(1));
  }


  removeStudents(student: any){
    return this.httpClient.post(this.API_URI + '/remover', student).pipe(take(1));    
  }

  getTotal(){
    return this.httpClient.get<number>(this.API_URI+'getTotal');
  }

}
