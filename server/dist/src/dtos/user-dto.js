"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UserDto {
    constructor(model) {
        this.username = model.username;
        this.id = model._id;
    }
}
exports.default = UserDto;
