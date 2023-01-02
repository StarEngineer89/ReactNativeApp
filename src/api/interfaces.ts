import { Profile, User } from 'src/entities';

export interface ILoginResponse {
  profiles: Profile[];
  success: boolean;
  user: User;
  token?: string;
}

export interface IUpdatePasswordResponse {
  success: boolean;
}
