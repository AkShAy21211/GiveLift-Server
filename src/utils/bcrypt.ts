import bcrypt from "bcryptjs";
import Logger from "./logger.js";

//create a bcrypt class

class BCrypt {
  constructor(private _saltRounds = 10) {}

  //hash password using bcrypt
  async hashPassword(password: string) {
    try {
      return await bcrypt.hash(password, this._saltRounds);
    } catch (error: any) {
      Logger.error(error.message);
    }
  }

  //compare password with hashed password
  async comparePassword(password: string, hashedPassword: string) {
    try {
      return bcrypt.compare(password, hashedPassword);
    } catch (error: any) {
      Logger.error(error.message);
    }
  }
}

export default BCrypt;
