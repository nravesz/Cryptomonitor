import { Request, Response, NextFunction } from 'express';
import {UserAlreadyExistsError, OnlyOneAdminError} from './errors';
import jwt from 'jsonwebtoken';

// Google
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_ID_CLIENT);

interface JwtPayload {
    email: string
  }

interface UserData {
    password: string;
    rol: string
  }

var admin = false;

const users = new Map<string, UserData>();

class AuthService {

    public login(email: string, password: string) {
        if (users.has(email)) {
            const userData = users.get(email);
            if (userData.password == password) {
                const user = {'email': email};
                return this.getNewToken(user);
            }
        }
        throw new Error("User does not exist");
    }

    public signup(email: string, password: string, rol: string) {
        this.validateUserData(email, password, rol);
        const userData: UserData = {
            password: password,
            rol: rol
        };
        users.set(email, userData);
        if (rol == "Admin") {
            admin = true;
        }
        const user = {'email': email};
        return jwt.sign(email, process.env.ACCESS_TOKEN_SECRET);
    }

    public authenticateToken(token: string) {
        if (!token) {
            return new Error("Authorization required");
        };
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string, (err, email) => {
            const verifiedToken = jwt.sign(token, process.env.ACCESS_TOKEN_SECRET);
            return new Error("Authorization required");
        })
    }

    public async authenticateTokenGoogle(token: string) {
        try {
            const ticket = await client.verifyIdToken({
                idToken: token,
                requiredAudience: process.env.GOOGLE_ID_CLIENT,
            });
            const payload = ticket.getPayload();
            return {
                email: payload['email'],
                sub: payload['sub']
            };
        } catch (err) {
            throw new Error("Authorization required")
        }
    }

    public authenticateRolPermit(token: string) {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (decoded) {
                const { email } = decoded as JwtPayload;
                const userData = users.get(email)
                const rol = userData.rol;
                if (rol != "Admin") {
                    return new Error("Authorization required")
                }
            } else {
                return new Error("Authorization required");
            }
        })
    }

    public getNewToken(email: JwtPayload) {
        return jwt.sign(email, process.env.ACCESS_TOKEN_SECRET as string);
    }

    private validateUserData(email: string, password: string, rol: string) {
        if (!email || !password) {
            throw new Error("Invalid user or password");
        }
        if (users.has(email)) {
            throw new UserAlreadyExistsError();
        }
        if (rol == "Admin" && admin) {
            throw new OnlyOneAdminError();
        }
    }

    public authGoogle(email: string, password: string, rol: string) {
        // sign-up
        let token: string;
        if (!users.has(email)) {
            return token = this.signup(email, password, rol);
        // login
        } else if (rol) {
            return token = this.login(email, password);
        } else {
            throw new Error("Authorization required");
        }
    }
};

export default AuthService;
