import {Schema, model, Types} from "mongoose";

export interface IUser{
    username: string,
    password: string,
    _id?: Schema.Types.ObjectId
}
const UserSchema = new Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
})

export default model<IUser>('User', UserSchema);