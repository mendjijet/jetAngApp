import {
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

import {
  DialogStudentComponent,
} from '../dialog-student/dialog-student.component';
import { Student } from '../model/students.model';
import { StudentsService } from '../services/students.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrl: './students.component.css',
})
export class StudentsComponent implements OnInit {
  public students!: Array<Student>;
  public studentsDataSource!: MatTableDataSource<Student>;
  public displayedColumns = [
    'id',
    'firstName',
    'lastName',
    'matricule',
    'programId',
    'payments',
    'action',
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private studentService: StudentsService,
    private router: Router,
    private dialog: MatDialog
  ) {}
  ngOnInit() {
    this.getAllStudents();
  }

  getAllStudents(){
    this.studentService.getAllStudents().subscribe({
      next: (data) => {
        this.students = data;
        this.studentsDataSource = new MatTableDataSource(this.students);
        this.studentsDataSource.paginator = this.paginator;
        this.studentsDataSource.sort = this.sort;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  filterStudents(event: Event) {
    let value = (event.target as HTMLInputElement).value;
    this.studentsDataSource.filter = value;
    if (this.studentsDataSource.paginator) {
      this.studentsDataSource.paginator.firstPage();
    }
  }

  studentPayments(student: any) {
    this.router.navigateByUrl(`/admin/student-details/${student.matricule}`);
  }

  editStudent(row: any) {
    this.dialog.open(DialogStudentComponent, {
      width: '30%',
      data: row,
    }).afterClosed().subscribe(val=>{
      if(val==='update'){
        this.getAllStudents();
      }
    });
  }

  openDialog() {
    this.dialog.open(DialogStudentComponent, {
      width: '30%',
    }).afterClosed().subscribe(val=>{
      if(val==='save'){
        this.getAllStudents();
      }
    });
  }

  deleteStudent(matricule:string){
    this.studentService.deleteStudent(matricule).subscribe({
      next: (data) => {
        alert("Student Deteted successfully");
        this.getAllStudents();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
