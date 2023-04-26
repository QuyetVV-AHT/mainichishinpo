import {Exam} from "../entity/Exam";
import {User} from "../entity/User";
export class Result{
  id!: number;
  mark!: string;
  user!: User;
  exam!: Exam;
}
