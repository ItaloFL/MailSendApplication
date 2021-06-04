import { response } from "express";
import { User } from "../../models/User";
import { IUserRepository } from "../IUserRepository";

interface IRequest{
    id: string
    name: string
    email:string
    password: string
}

export class UserImplementations implements IUserRepository{
    users: User[] = [];
    
    async findByEmail(email: string): Promise<User> {
        const user = this.users.find(user => user.email === email)
        
        return user;
    }

    async save(user: IRequest): Promise<User> {
        this.users.push(user);
         
        return user
    }

    

}