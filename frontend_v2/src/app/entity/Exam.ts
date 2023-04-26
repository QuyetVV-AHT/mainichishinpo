import {Question} from "../entity/Question";
export class Exam{
  id:number = 0;
  exam_name: string | undefined;
  note: string |  undefined;
  active: boolean | undefined;
  questions: Question[] | undefined;
}
