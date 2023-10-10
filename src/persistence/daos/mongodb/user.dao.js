import { UserModel } from "./models/user.model.js";
import { createHash, isValidPassword } from "../../../utils.js"
import {logger} from '../../../utils.js'

export default class UserDaoMongoDB {
    async register(user) {
        try {
            const { email,password } = user;
            const existUser = await UserModel.findOne({ email });
            if(!existUser) {
                if(email === 'adminCoder@coder.com' && password === 'adminCod3r123'){
                    logger.warn('Usuario admin creado')
                    
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

    async getById(id){
        try {
          const userExist = await UserModel.findById(id)
          if(userExist) return userExist
          else return false
        } catch (error) {
          console.log(error)
          // throw new Error(error)
        }
      }
    
      async getByEmail(email){
        try {
          const userExist = await UserModel.findOne({email}); 
          // console.log(userExist);
          if(userExist) return userExist
          else return false
        } catch (error) {
          console.log(error)
          throw new Error(error)
        }
      }

      async premium(user) {
        try {
          const {id} = user;
          const userExist = await UserModel.findById(id);
          //si es user lo pasamos a premium, si es premium lo pasamos a user
          if(userExist && userExist.role === 'user') {
            const updateUser = await UserModel.findByIdAndUpdate(id, {role: 'premium'}, {new: true});
            return updateUser;
            } else if(userExist && userExist.role === 'premium') {
              const updateUser = await UserModel.findByIdAndUpdate(id, {role: 'user'}, {new: true});
              return updateUser;
            } else return false;


        } catch (error) {
          console.log(error);
        }
      }

}