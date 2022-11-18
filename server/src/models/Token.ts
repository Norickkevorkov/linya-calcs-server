import {Schema,Types, model} from "mongoose";

export interface IToken {
    userId: Types.ObjectId,
    refreshToken: string,
}
const TokenSchema = new Schema<IToken>({
    userId: {type: Schema.Types.ObjectId, ref: 'User'},
    refreshToken: {type: String, required: true},
})

export default model<IToken>('Token', TokenSchema)