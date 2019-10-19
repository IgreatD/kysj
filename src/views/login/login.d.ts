import { IFormValidate } from '@/types';
interface IloginForm {
  userName: string;
  passWord: string;
}

interface ILoginRules {
  userName: IFormValidate[];
  passWord: IFormValidate[];
}

export interface ILogin {
  title: string;
  loading: boolean;
  loginForm: IloginForm;
  rules: ILoginRules;
  login: () => void;
}
