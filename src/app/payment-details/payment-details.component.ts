import {
  Component,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { StudentsService } from '../services/students.service';

@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styleUrl: './payment-details.component.css'
})
export class PaymentDetailsComponent implements OnInit{
  paymentId!:number;
  mediaType:string = 'application/image';
  imageFileUrl:any;


  constructor(private studentsService:StudentsService, private activatedRoute:ActivatedRoute){}

  ngOnInit(): void {
    this.paymentId = this.activatedRoute.snapshot.params['paymentId'];
    this.studentsService.getPaymentDetails(this.paymentId).subscribe({
      next:value=>{
        let blob:Blob = new Blob([value], {type:this.mediaType});
        this.imageFileUrl = window.URL.createObjectURL(blob);
      }, error: err=>{
        console.log(err);
      }
    });
  }

}
