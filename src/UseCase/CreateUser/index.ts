import { NodeMailerIMailProvider } from "../../providers/implementations/NodeMailerIMailProvider";
import { UserImplementations } from "../../repositories/implementations/UserImplementations";
import { CreateUserController } from "./CreateUserController";
import { CreateUserUseCase } from "./CreateUserUseCase";

const nodeMailerIMaelProvider = new NodeMailerIMailProvider()
const userImplementations =  new UserImplementations()



const createUserUseCase = new CreateUserUseCase(
    userImplementations,
    nodeMailerIMaelProvider
)

const createUserController = new CreateUserController(
    createUserUseCase
)


export { createUserController }