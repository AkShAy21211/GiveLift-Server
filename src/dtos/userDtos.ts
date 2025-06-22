import { ParamsDictionary } from "express-serve-static-core";

export interface RegisterUserDto {
  name: string;
  email: string;
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
  city: string;
  state: string;
  country: string;
  pincode: string;
  gender: string;
  dob: string;
}
