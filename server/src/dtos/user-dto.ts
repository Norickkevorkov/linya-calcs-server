import {Schema} from "mongoose";
import {IUser} from "../models/User";

export default class UserDto {
    username: string;
    id: Schema.Types.ObjectId | undefined;

    constructor(model: IUser) {
        this.username = model.username
        this.id = model._id
    }
}