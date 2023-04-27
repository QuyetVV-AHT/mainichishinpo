import { User } from "../entity/User";
import { Comments } from "./Comments";

export class Post{
  id!: number;
  post_name!: string;
  contents!: string;
  comments!: Comments;
  user!: User;
  active: boolean | undefined;
}

export class PostRequest{
  post_name!: string;
  contents!: string;
}
