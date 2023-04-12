import { Exam } from "../exam/exam";
import { User } from "../user/user";

export class Result{
  id!: number;
  mark!: string;
  user!: User;
  exam!: Exam;
}
