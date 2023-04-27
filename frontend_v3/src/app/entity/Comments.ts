import { User } from "../entity/User";

export class Comments{
  id!: number;
  content!: string;
  user!: User;
}
