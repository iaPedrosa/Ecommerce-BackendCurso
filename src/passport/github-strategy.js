
import { Strategy as GithubStrategy } from 'passport-github2';
import passport from 'passport';
import UserDao from '../daos/mongodb/user.dao.js';
const userDao = new UserDao();


const strategyOptions = {
    clientID: 'Iv1.0bea34365e4f6b4e',
    clientSecret: '4acf33f8135f2d2d63a68d31f5949b2c07d1974c',
    callbackURL: 'https://iapedrosashop.adaptable.app/users/profile-github',
   
};

const registerOrLogin = async (accessToken, refreshToken, profile, done) => {

    const email = profile._json.email !== null ? profile._json.email : profile._json.login+'@github';
    const user = await userDao.getByEmail( email );
    if ( user ) return done( null, user );
    const newUser = await userDao.registerUser({
        first_name: profile._json.name.split(' ')[0],
        last_name: profile._json.name.split(' ')[1],
        email,
        password: '',
        isGithub: true
    });
    return done(null, newUser);
}

passport.use('github', new GithubStrategy(strategyOptions, registerOrLogin));   