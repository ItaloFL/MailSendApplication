import { request } from "express";
import { User } from "../../models/User";
import { IMailProvider } from "../../providers/IMailProvider";
import { IUserRepository } from "../../repositories/IUserRepository";
import { ICreateUserResquestDTO } from "./CreateUserDTO";



export class CreateUserUseCase{

    constructor(
        private userRepository: IUserRepository,
        private mailProvider: IMailProvider
    ){}

    async execute(  data : ICreateUserResquestDTO){ 
        const userAlreadyExist = await this.userRepository.findByEmail(data.email)
        
        if (userAlreadyExist) {
            throw new Error('User Already Exists.')
        }
 
        const user = new User(data)
        
        

        await this.userRepository.save(user)
          

        await this.mailProvider.sendMail({
            to: {
                name: data.name,
                email: data.email,
            },
            from: {
                name: 'Italo Ferreira Lopes',
                email: 'italotestmail.gmail.com'
            },
            subject: 'Testando o envio de email com SOLID',
            body: '<p>Hello seja bem vindo ao email com solid. deu certo. parabens<p>'
        })
    }
}