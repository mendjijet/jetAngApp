export interface Student{
    id:string,
    matricule:string,
    firstname:string,
    lastname:string,
    programId:string,
    photo:string
}

export interface Payment{
    id:number,
    date:string,
    amount:number,
    type:string,
    status:string,
    file:string,
    student:Student
}

export enum PayementType{
    CASH,CHEQUE,TRANSFERT,DEPOSIT
}

export enum PayementStatus{
    CREATED, VALIDATED, REJECTED
}