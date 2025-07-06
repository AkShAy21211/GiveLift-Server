export interface RegisterUserDto {
  name: string;
  email: string;
  phone: string;
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
  state: string;
  country: string;
  pincode: string;
  gender: string;
  dob: string;
}

export interface CreateUserDto {
  name: string;
  email: string;
  phone: string;
  password: string;
  role: string;
  district: string;
  state: string;
  country: string;
}

export interface UpdateUserDto {
  name: string;
  email: string;
  phone: string;
  password: string;
  role: string;
  district: string;
  state: string;
  country: string;
}
