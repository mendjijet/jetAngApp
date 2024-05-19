import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { environment } from '../../environments/environment.development';
import {
  Payment,
  Student,
} from '../model/students.model';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  constructor(private http: HttpClient) { }

  public getAllPayments():Observable<Array<Payment>>{
    return this.http.get<Array<Payment>>(`${environment.backendHost}/payments`);
  }

  public getAllStudents():Observable<Array<Student>>{
    return this.http.get<Array<Student>>(`${environment.backendHost}/students`);
  }

  public getStudentPayements(matricule:string):Observable<Array<Payment>>{
    return this.http.get<Array<Payment>>(`${environment.backendHost}/student/${matricule}/payments`);
  }

  public getPaymentDetails(paymentId:number){
    return this.http.get(`${environment.backendHost}/paymentFile/${paymentId}`, {responseType:'blob'});
  }

  public savePayements(formData:any):Observable<Payment>{
    return this.http.post<Payment>(`${environment.backendHost}/payment`, formData);
  }
}
