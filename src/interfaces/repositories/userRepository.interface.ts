import { User } from "../../entities/User.js";

interface IUserRepository{

    create(user:User):Promise<User|null>;
    findUserByEmailOrPhone(email:string,phone:string):Promise<User|null>;

}

export default  IUserRepository