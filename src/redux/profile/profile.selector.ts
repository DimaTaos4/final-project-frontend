import type { IUserDoc } from "./profile.slice";

interface ISelectUsers {
  user: null | IUserDoc;
  loading: boolean;
  error: string | null;
}

interface IStore {
  profile: ISelectUsers;
}
export const selectProfile = (store: IStore): ISelectUsers => store.profile;
