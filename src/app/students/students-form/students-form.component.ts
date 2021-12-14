import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentsService } from '../services/students.service';

@Component({
  selector: 'app-students-form',
  templateUrl: './students-form.component.html',
  styleUrls: ['./students-form.component.css']
})
export class StudentsFormComponent implements OnInit {

  form: FormGroup;
  submitted: boolean = false;

  constructor(private fb: FormBuilder,
    private service: StudentsService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.route.params.subscribe(
      (params: any) => {
        const id = params['id'];
        if (id) {
          const student$ = this.service.getStudentById(id);
          student$.subscribe(student => {
            this.updateForm(student)
          })
        }
      }
    )

    this.form = this.fb.group({
      id: [null],
      nome: [null, [Validators.required]],
      matricula: [null, [Validators.required]],
      nascimento: [null],
      dataHoraCadastro: [new Date()]
    })

  }

  updateForm(student: any) {
    this.form.patchValue({
      id: student.id,
      nome: student.nome,
      matricula: student.matricula,
      nascimento: student.nascimento ? new Date(student.nascimento) : null
    })
  }

  hasErrors(field: string) {
    this.form.get(field)?.errors;
  }

  onSubmit() {
    this.submitted = true;
    if (this.form.valid) {
      this.service.addStudents(this.form.value).subscribe(
        success => this.router.navigate(['../../students']),
        error => console.log(error),
        () => console.log('Request complete')
      );
    }
  }

  onCancel() {
    this.submitted = false;
    this.form.reset();
  }

}
