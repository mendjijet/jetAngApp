import {
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';

import { StudentsService } from '../services/students.service';

@Component({
  selector: 'app-dialog-student',
  templateUrl: './dialog-student.component.html',
  styleUrl: './dialog-student.component.css',
})
export class DialogStudentComponent implements OnInit {
  genders: string[] = ['Male', 'Female'];
  studentForm!: FormGroup;
  imageURL!: string;
  actionBtn: string = 'Save';
  idStudent!: string;

  constructor(
    private dateAdapter: DateAdapter<Date>,
    private formBuilder: FormBuilder,
    private studentsService: StudentsService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private matDialogRef: MatDialogRef<DialogStudentComponent>
  ) {
    this.dateAdapter.setLocale('en-GB');
  }
  ngOnInit(): void {
    this.studentForm = this.formBuilder.group({
      studentMatricule: ['', Validators.required],
      studentFirstName: ['', Validators.required],
      studentLastName: ['', Validators.required],
      studentProgram: ['', Validators.required],
      studentDateOfBirth: ['', Validators.required],
      studentGender: ['', Validators.required],
      studentAge: ['', Validators.required],
      studentComment: ['', Validators.required],
      fileSource: this.formBuilder.control(''),
    });
    if (this.editData) {
      this.actionBtn = 'Update';
      this.idStudent = this.editData.id;
      this.studentForm.get('studentMatricule')?.disable();
      this.studentForm.controls['studentMatricule'].setValue(
        this.editData.matricule
      );
      this.studentForm.controls['studentFirstName'].setValue(
        this.editData.firstName
      );
      this.studentForm.controls['studentLastName'].setValue(
        this.editData.lastName
      );
      this.studentForm.controls['studentProgram'].setValue(
        this.editData.programId
      );
      this.studentForm.controls['studentDateOfBirth'].setValue(
        this.editData.dateOfBirth
      );
      this.studentForm.controls['studentGender'].setValue(this.editData.gender);
      this.studentForm.controls['studentAge'].setValue(this.editData.age);
      this.studentForm.controls['studentComment'].setValue(
        this.editData.comment
      );
    }
  }

  selectFile(event: any) {
    if (event.target.files.length > 0) {
      let file = event.target.files[0];
      this.studentForm.patchValue({
        fileSource: file,
      });
      this.imageURL = window.URL.createObjectURL(file);
    }
  }

  addStudent() {
    //console.log(this.studentForm.value);
    //if(this.studentForm.valid){
    let date: Date = new Date(this.studentForm.value.studentDateOfBirth);
    let formattedDate =
      date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
    let formData: FormData = new FormData();
    if (!this.editData) {
      formData.set('firstName', this.studentForm.value.studentFirstName);
      formData.set('lastName', this.studentForm.value.studentLastName);
      formData.set('matricule', this.studentForm.value.studentMatricule);
      formData.set('programId', this.studentForm.value.studentProgram);
      formData.set('age', this.studentForm.value.studentAge);
      formData.set('dateOfBirth', formattedDate);
      formData.set('gender', this.studentForm.value.studentGender);
      formData.set('comment', this.studentForm.value.studentComment);
      formData.set('file', this.studentForm.value.fileSource);
      this.studentsService.saveStudent(formData).subscribe({
        next: (value) => {
          //this.showProgress=false;
          alert('Student Saved successfully');
          this.studentForm.reset();
          this.matDialogRef.close('save');
        },
        error: (err) => {
          console.log(err);
        },
      });
    } else {
      this.updateStudent();
    }
    //   }else{
    //     alert("Student Form is not OK")
    //   }
  }

  updateStudent() {
    let date: Date = new Date(this.studentForm.value.studentDateOfBirth);
    let formattedDate =
      date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
    let formData: FormData = new FormData();
    formData.set('id', this.idStudent);
    formData.set('firstName', this.studentForm.value.studentFirstName);
    formData.set('lastName', this.studentForm.value.studentLastName);
    formData.set('matricule', this.studentForm.value.studentMatricule);
    formData.set('programId', this.studentForm.value.studentProgram);
    formData.set('age', this.studentForm.value.studentAge);
    formData.set('dateOfBirth', formattedDate);
    formData.set('gender', this.studentForm.value.studentGender);
    formData.set('comment', this.studentForm.value.studentComment);
    formData.set('file', this.studentForm.value.fileSource);
    this.studentsService.saveStudent(formData).subscribe({
      next: (value) => {
        //this.showProgress=false;
        alert('Student updated successfully');
        this.studentForm.reset();
        this.matDialogRef.close('update');
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
