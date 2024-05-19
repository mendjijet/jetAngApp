import {
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {
  ActivatedRoute,
  Router,
} from '@angular/router';

import { Payment } from '../model/students.model';
import { StudentsService } from '../services/students.service';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrl: './student-details.component.css',
})

export class StudentDetailsComponent implements OnInit{

  studentMatricule!: string;
  studentPayements!:Array<Payment>;
  paymentStudentDataSource!: MatTableDataSource<Payment>;
  public displayedColumns=['id','date', 'amount', 'paymentType', 'paymentStatus', 'firstName', 'details'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  constructor(private activatedRoute: ActivatedRoute, private studentsService: StudentsService, private router:Router) {}

  ngOnInit(): void {
    this.studentMatricule = this.activatedRoute.snapshot.params['matricule'];
    this.studentsService.getStudentPayements(this.studentMatricule).subscribe({
      next: data =>{
        this.studentPayements = data;
        this.paymentStudentDataSource = new MatTableDataSource(this.studentPayements);
        this.paymentStudentDataSource.paginator = this.paginator;
        this.paymentStudentDataSource.sort = this.sort;
      },
      error: err =>{console.log(err);
      }
    });
  }

  newPayment() {
    this.router.navigateByUrl(`/admin/new-payment/${this.studentMatricule}`);
    }

  filterStudents(event: Event) {
    let value = (event.target as HTMLInputElement).value;
    this.paymentStudentDataSource.filter = value;
  }

  getPaymentDetails(payment: Payment) {
    this.router.navigateByUrl(`/admin/payment-details/${payment.id}`);
    }
}
