
export interface RegisterUserDto {
  name: string;
  email: string;
  country: string;
  state: string;
  district: string;
  password: string;
}

export interface LoginUserDto {
  email: string;
  password: string;
}

export interface ForgetPasswordDto {
  phone: string;
}

export interface VerifyForgetPasswordDto {
  otp: string;
}

export interface ResetForgotedPasswordDto {
  password: string;
}

export interface InitStateCoordinatorDto {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  district: string;
  state: object;
  country: object;
  pincode: string;
  gender: string;
  dob: string;
}
