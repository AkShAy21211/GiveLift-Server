export interface RegisterUserDto {
  name: string;
  email: string;
  password: string;
  avatar?:string;
  phone: string;
  address: {
    coord: [number];
    city: string;
    district: string;
  };
  role: string;
  isVolunteer: boolean;
}

export interface LoginUserDto{
  email: string;
  password: string;

}

export interface ForgetPasswordDto{
  phone: string;
}