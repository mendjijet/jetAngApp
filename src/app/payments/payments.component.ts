import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrl: './payments.component.css'
})
export class PaymentsComponent implements OnInit{

  public payments:any;
  public dataSource:any;
  public displayedColumns=['id','date', 'amount', 'paymentType', 'paymentStatus', 'firstName'];
@ViewChild(MatPaginator) paginator!:MatPaginator;
@ViewChild(MatSort) sort!:MatSort;

  constructor(private http: HttpClient){
  }

  ngOnInit(){
    this.http.get("http://localhost:8021/payments")
    .subscribe({
      next: data =>{
        this.payments = data;
        this.dataSource = new MatTableDataSource(this.payments);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: err =>{console.log(err);
      }
    })
  }

}
