interface User {
  _id: string;
  name: string;
  email: string;
  active: boolean;
  verified: boolean;
  verificationCode: string;
  resetPasswordToken: string;
  resetPasswordExpiresIn: Date | string;
  socialId: string;
  authType: string; // TODO: confirm this type
  loginAttempt: number;
}

export default User;
