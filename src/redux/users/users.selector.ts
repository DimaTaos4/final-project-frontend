import type { IUserDoc } from "./users.slice";

interface ISelectUsers {
  user: null | IUserDoc;
  token: string | null;
  isAuth: boolean;
  loading: boolean;
  error: string | null;
}

interface IStore {
  auth: ISelectUsers;
}
export const selectUsers = (store: IStore): ISelectUsers => store.auth;

