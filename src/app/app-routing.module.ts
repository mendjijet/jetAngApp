import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes,
} from '@angular/router';

import {
  AdminTemplateComponent,
} from './admin-template/admin-template.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {
  DialogStudentComponent,
} from './dialog-student/dialog-student.component';
import { AuthGuard } from './guards/auth.guard';
import { AuthorizationGuard } from './guards/authorization.guard';
import { HomeComponent } from './home/home.component';
import { LoadPaymentsComponent } from './load-payments/load-payments.component';
import { LoadStudentsComponent } from './load-students/load-students.component';
import { LoginComponent } from './login/login.component';
import { NewPaymentComponent } from './new-payment/new-payment.component';
import {
  PaymentDetailsComponent,
} from './payment-details/payment-details.component';
import { PaymentsComponent } from './payments/payments.component';
import { ProfileComponent } from './profile/profile.component';
import {
  StudentDetailsComponent,
} from './student-details/student-details.component';
import { StudentsComponent } from './students/students.component';

const routes: Routes = [
  {path : "", component : LoginComponent},
  {path : "login", component : LoginComponent},
  {path : "admin", component : AdminTemplateComponent, canActivate : [AuthGuard],

    children : [
      {path : "home", component : HomeComponent},
      {path : "profile", component : ProfileComponent},
      {path : "dashboard", component : DashboardComponent},
      {path : "students", component : StudentsComponent},
      {path : "addstudent", component : DialogStudentComponent, canActivate : [AuthorizationGuard], data : {roles : ['ADMIN']}},
      {path : "new-payment/:matricule", component : NewPaymentComponent},
      {path : "payment-details/:paymentId", component : PaymentDetailsComponent},
      {path : "student-details/:matricule", component : StudentDetailsComponent, canActivate : [AuthorizationGuard], data : {roles : ['ADMIN']}},
      {path : "payments", component : PaymentsComponent, canActivate : [AuthorizationGuard], data : {roles : ['ADMIN']}},
      {path : "loadStudents", component : LoadStudentsComponent,
        canActivate : [AuthorizationGuard], data : {roles : ['ADMIN']}},
      {path : "loadPayments", component : LoadPaymentsComponent,
        canActivate : [AuthorizationGuard], data : {roles : ['ADMIN']} },
    ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
