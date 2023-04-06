export class Question{
  id:number = 0;
  question:string| undefined;
  ans_A:string| undefined;
  ans_B:string| undefined;
  ans_C: string |undefined;
  ans_D:string |undefined
  ans_Correct:string |undefined
  note: string | undefined
}

export class QuestionRequest{
  question:string| undefined;
  ans_A:string| undefined;
  ans_B:string| undefined;
  ans_C: string |undefined;
  ans_D:string |undefined
  ans_Correct:string |undefined
  note: string | undefined
}
