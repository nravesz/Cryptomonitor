import { Router, Request, Response } from "express";
import {admin} from "../../index";
import AuthService from "../../services/auth_service";
import { UserAlreadyExistsError, OnlyOneAdminError } from '../../services/errors'

const authController = Router();
const authService = new AuthService();

authController.post('/login', (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        const token: string = authService.login(email, password);
        return sendValidUserResponse(res, token);
    } catch {
        return sendInvalidUserResponse(res);
    }
});

authController.post('/sign-up', (req, res) => {
    const { email, password, rol } = req.body;
    try {
        const token: string = authService.signup(email, password, rol);
        sendValidUserResponse(res, token);
    } catch (err) {
        if (err instanceof(UserAlreadyExistsError)) {
            return res.json({
                'sucess': false,
                'message': "User already exists"
            });
        }
        if (err instanceof(OnlyOneAdminError)) {
            return res.json({
                'sucess': false,
                'message': "There can only be one admin"
            });
        }
        return sendInvalidUserResponse(res);
    }
});

authController.post('/auth-google', (req, res) => {
    const { token, rol } = req.body;
    try {
        authService.authenticateTokenGoogle(token)
        .then((data) => {
            const email = data.email;
            const sub = data.sub;
            const token:string = authService.authGoogle(email, sub, rol);
            return sendValidUserResponse(res, token);
        })
        .catch((err) => {
            sendInvalidUserResponse(res);
        })
    } catch (err) {
        return sendInvalidUserResponse(res);
    }
});

function sendValidUserResponse(res: Response, accessToken: string) {
    return res.json({
        'success': true,
        'token': accessToken
    });
}

function sendInvalidUserResponse(res: Response) {
    return res.json({
        'success': false,
        'message': 'Invalid email or password'
    })
}

function extractToken(req: Request) {
    const authHeader = req.headers['authorization'];
    return (authHeader && authHeader.split(' ')[1]);
}

function authenticateToken(req: Request, res: Response, next: Function) {
    const token = extractToken(req);
    try {
        authService.authenticateToken(token);
        next();
    } catch {
            return res.json({
                'success': false,
                'message': 'Authorization required'
            })
    }
}

function authenticateRolPermit(req: Request, res: Response, next: Function) {
    const token = extractToken(req);
    try {
        authService.authenticateRolPermit(token);
        next();
    } catch (err) {
        res.json({
            'success': false,
            'message': 'Authorization required'
        });
    }
}

export {
    authController,
    authenticateToken,
    authenticateRolPermit
};
