export class User{
  id:number = 0;
  username:string| undefined;
  email:string| undefined;
  address:string| undefined;
  password: string |undefined;
  note: string | undefined
}


export class UserRequest{
  username:string| undefined;
  email:string| undefined;
  address:string| undefined;
  note:string| undefined;
  password: string| undefined;
  rePassword: string| undefined;
}
