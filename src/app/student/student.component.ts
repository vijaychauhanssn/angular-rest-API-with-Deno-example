import { Component, OnInit } from '@angular/core';
import { StudentService } from '../shared/student.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, combineLatest, EMPTY } from 'rxjs';
import { Student } from '../model/student.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { switchMap, filter } from 'rxjs/operators';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  form: FormGroup;
  isEdit = false;
  private student: Student;

  constructor(
    private service: StudentService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.initForm();

    this.route.paramMap.pipe(switchMap(p => {
          const eId = +p.get('studentId');
          if (eId > 0) {
            this.isEdit = true;
            return this.service.getStudent(eId);
          }
          this.isEdit = false;
          return EMPTY;
        }),
        filter(f => !!f)
      )
      .subscribe(student => {
        this.student = student;
        this.form.patchValue(student);
      });

  }

  get firstname() {
    return this.form.get('firstname');
  }
  get lastname() {
    return this.form.get('lastname');
  }
  get email() {
    return this.form.get('email');
  }

  createStudent() {
    if (this.form.valid) {
      this.service.createStudent(this.form.value as Student).subscribe(() => {
        this.navigateBack();
      });
    }
  }

  updateStudent() {
    if (this.form.valid) {
      const payload = { ...this.student, ...this.form.value };
      this.service.updateStudent(payload).subscribe(() => {
        this.navigateBack();
      });
    }
  }

  removeStudent() {
    const remove = window.confirm('Are you sure?');
    if (remove) {
      const payload = { ...this.student, ...this.form.value };
      this.service.removeStudent(payload).subscribe(() => {
        this.navigateBack();
      });
    }
  }

  navigateBack() {
    this.router.navigate(['/students'], { queryParamsHandling: 'preserve' });
  }

  private initForm() {
    this.form = this.fb.group(
      {
        firstname: ['', { validators: Validators.required, updateOn: 'blur' }],
        lastname: ['', Validators.required],
        email: ['']
      }
    );
  }

}
