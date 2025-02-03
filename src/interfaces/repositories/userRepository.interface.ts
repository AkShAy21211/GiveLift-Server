import { User } from "../../entities/User.js";

interface IUserRepository{

    create(user:User):Promise<User>;
    findUserByEmailOrPhone(email:string,phone:string):Promise<User|null>;

}

export default  IUserRepository