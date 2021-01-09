import { Request, Response } from "express";
import CreateUserService from "../services/CreateUserService";
import DeleteUserService from "../services/DeleteUserService";
import ListUsersService from "../services/ListUserService";
import ShowUserService from "../services/ShowUserService";
import UpdateUserService from "../services/UpdateUserService";

export default class UsersController {
  public async index(req: Request, res: Response): Promise<Response> {
    const listUsers = new ListUsersService()

    const users = await listUsers.execute()

    return res.json(users)
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params

    const showUser = new ShowUserService()

    const user = await showUser.execute({ id })

    return res.json(user)
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { name, email, password } = req.body

    const createUser = new CreateUserService()

    const user = await createUser.execute({
      name,
      email,
      password
    })

    return res.json(user)
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    const { name, email, password } = req.body

    const updateUser = new UpdateUserService()

    const user = await updateUser.execute({
      id,
      name,
      email,
      password
    })

    return res.json(user)
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params

    const deleteUser = new DeleteUserService()

    await deleteUser.execute({ id })

    return res.json([])
  }
}
