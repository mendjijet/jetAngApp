import {
  Component,
  OnInit,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { PayementType } from '../model/students.model';
import { StudentsService } from '../services/students.service';

@Component({
  selector: 'app-new-payment',
  templateUrl: './new-payment.component.html',
  styleUrl: './new-payment.component.css',
})
export class NewPaymentComponent implements OnInit {

paymentFormGroup!: FormGroup;
studentMatricule!: string;
paymentType:String[]=[];
imageFileUrl!:string;
showProgress:boolean=false;

  constructor(private fb:FormBuilder, private activatedRoute: ActivatedRoute, private studentsService:StudentsService) 
  {}

  ngOnInit(): void {
    this.studentMatricule = this.activatedRoute.snapshot.params['matricule'];
    for(let elt in PayementType){
      let value :string=PayementType[elt];
      if(typeof value ==='string'){
        this.paymentType.push(value);
      }
    }

    this.paymentFormGroup = this.fb.group({
      date:this.fb.control(''),
      amount:this.fb.control(''),
      type:this.fb.control(''),
      matricule:this.fb.control(this.studentMatricule),
      fileSource:this.fb.control(''),
      fileName:this.fb.control('')
    });
  }

  selectFile(event: any) {
    if(event.target.files.length>0){
      let file = event.target.files[0];
      this.paymentFormGroup.patchValue({
        fileSource:file,
        fileName:file.name
      });
      this.imageFileUrl = window.URL.createObjectURL(file);
    }

    }

    savePayment() {
      this.showProgress=true;
      let date:Date = new Date(this.paymentFormGroup.value.date);
      let formattedDate = date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear();
      let formData:FormData = new FormData();
      formData.set('date',formattedDate);
      formData.set('amount',this.paymentFormGroup.value.amount);
      formData.set('type',this.paymentFormGroup.value.type);
      formData.set('matricule',this.paymentFormGroup.value.matricule);
      formData.set('file',this.paymentFormGroup.value.fileSource);
      this.studentsService.savePayements(formData).subscribe({
        next: value=>{
          this.showProgress=false;
          alert('Payement Saved successfully');
        },
        error:err=>{
          console.log(err);
        }
      });
      }

      afterLoadComplete(event: any) {
        console.log(event);
        }
}
