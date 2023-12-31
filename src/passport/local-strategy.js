import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import factory from '../persistence/daos/factory.js';
const { userDao } = factory;

const strategyOptions = {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
};

/* ----------------------------- lógica registro ---------------------------- */
const register = async(req, email, password, done) => {
    try {
        // const { first_name, last_name,... } = req.body
        const user = await userDao.getByEmail(email);
        if (user) return done(null, false);
        const newUser = await userDao.registerUser(req.body);
        return done(null, newUser);
    } catch (error) {
        console.log(error);
    }
};


/* ------------------------------ lógica login ------------------------------ */
const login = async(req, email, password, done) => {
    try {
        const user = { email, password };
        const userLogin = await userDao.loginUser(user);
        if(!userLogin) return done(null, false);
        return done(null, userLogin);
    } catch (error) {
        console.log(error);
    }
};

/* ------------------------------- strategies ------------------------------- */
const registerStrategy = new LocalStrategy(strategyOptions, register);
const loginStrategy = new LocalStrategy(strategyOptions, login);



/* ----------------------------- inicializacion ----------------------------- */
passport.use('login', loginStrategy);
passport.use('register', registerStrategy);



/* ------------------------- serialize y deserialize ------------------------ */
//guarda al usuario en req.session.passport
//req.session.passport.user --> id del usuario
passport.serializeUser((user, done)=>{
    done(null, user._id)
});

passport.deserializeUser(async(id, done)=> {
    const user = await userDao.getById(id);
    return done(null, user);
});