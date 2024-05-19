import {
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

import { Student } from '../model/students.model';
import { StudentsService } from '../services/students.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrl: './students.component.css',
})
export class StudentsComponent implements OnInit{
  public students!: Array<Student>;
  public studentsDataSource!: MatTableDataSource<Student>;
  public displayedColumns = [
    'id',
    'firstName',
    'lastName',
    'matricule',
    'programId',
    'payments',
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private studentService: StudentsService,
    private router: Router
  ) {}
  ngOnInit() {
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
  }

  studentPayments(student: any) {
    this.router.navigateByUrl(`/admin/student-details/${student.matricule}`);
  }
}
