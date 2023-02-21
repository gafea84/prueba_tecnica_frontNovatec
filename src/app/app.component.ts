import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { IUser } from './cors/user-interface';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'novatec_test';
  public studentsList: any = [];
  public professorList: any = [];
  public type!: number;
  public user!: IUser;
  //Reactive form for country client
  public usersForm: FormGroup;

  constructor(private userService: UserService, private fb: FormBuilder) {
    this.usersForm = this.fb.group({
      name: [],
      email: [],
    });
  }

  ngOnInit(): void {
    this.loadStudents();
    this.loadProfessors();
  }

  public loadStudents() {
    this.userService.getStudents().subscribe((response) => {
      this.studentsList = response;
    });
  }
  public loadProfessors() {
    this.userService.getProfessors().subscribe((response) => {
      this.professorList = response;
    });
  }

  public changeStateProfessor() {
    this.type = 1;
  }
  public changeStateStudent() {
    this.type = 2;
  }

  createUser() {
    if (this.usersForm.invalid) {
      this.usersForm.markAllAsTouched();
    } else {
      if (this.type == 1) {
        const form = new FormData();
        form.append('nameProfessor', this.usersForm.get('name')?.value);
        form.append('emailProfessor', this.usersForm.get('email')?.value);
        this.userService.createProfessor(form).subscribe((res) => {
          //this.ngOnInit()
        });
      } else {
        const form = new FormData();
        form.append('nameStudent', this.usersForm.get('name')?.value);
        form.append('emailStudent', this.usersForm.get('email')?.value);
        this.userService.createStudent(form).subscribe((res) => {
          //this.ngOnInit()
        });
      }
    }
  }
}
