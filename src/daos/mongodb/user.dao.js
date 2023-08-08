import { UserModel } from "./models/user.model.js";
import { createHash, isValidPassword } from "../../utils.js";

export default class UserDao {
    async registerUser(user) {
        try {
            const { email,password } = user;
            const existUser = await UserModel.findOne({ email });
            if(!existUser) {
                if(email === 'adminCoder@coder.com' && password === 'adminCod3r123'){
                    console.log('Usuario admin creado');
                    const newUser = await UserModel.create({...user, password: createHash(password) , role: 'admin'});
                    return newUser;
                }
                return await UserModel.create({
                    ...user,
                    password: createHash(password)
                });
            } else return false;
        } catch (error) {
            console.log(error);
        }
    };

    async loginUser(user) {
        try {
            const { email, password } = user;
            
            const userExist = await UserModel.findOne({ email});
            if(userExist) {
                const passValid = isValidPassword(password, userExist);
                if(!passValid) return false;
                else return userExist;
            }
            else return false;
           
        } catch (error) {
            console.log(error);
        }
    };

    async infoUser(email) {
        try {
            
            const user = await UserModel.findOne({ email });
            return user;
        } catch (error) {
            console.log(error);
            
        }

    }
}