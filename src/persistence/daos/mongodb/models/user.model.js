import { Schema, model } from "mongoose";

const userSchema = new Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    age: {
        type: Number,
        required: true,
        default: 0

    },
    password: { 
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'user'
    },
    isGithub: {
        type: Boolean,
        required: true,
        default: false
    },
    isGoogle: {
        type: Boolean,
        required: true,
        default: false
    },
    documents: [{
        name: String,
        reference: String
    }],
   profilepic:{
    type: Boolean,
        required: true,
        default: false
   },
   direccion:{
        type: Boolean,
        required: true,
        default: false
   },
   estadoDeCuenta:{
        type: Boolean,
        required: true,
        default: false
   },
   
});

export const UserModel = model('users', userSchema);