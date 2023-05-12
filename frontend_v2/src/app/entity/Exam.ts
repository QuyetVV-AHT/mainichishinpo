import {Question, QuestionFillWord} from "../entity/Question";
export class Exam{
  id:number = 0;
  exam_name: string | undefined;
  note: string |  undefined;
  active: boolean | undefined;
  listQuestionId: number[] | undefined;
  questions!: Question[] | undefined;
}

export class ExamFillWord{
  id:number = 0;
  exam_name: string | undefined;
  note: string |  undefined;
  active: boolean | undefined;
  listQuestionId: number[] | undefined;
  questions!: QuestionFillWord[] | undefined;
}

export class ExamDto{
  id:number = 0;
  exam_name: string | undefined;
  note: string |  undefined;
  active: boolean | undefined;
  questionTotal: number| undefined;
  type: string|undefined;
}
