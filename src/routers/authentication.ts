import { apiCheck, login, register } from '../controllers/authentication';
import express from 'express';

export default (router:express.Router) => {
    router.get('/auth', apiCheck);
    router.post('/auth/register',register);
    router.post('/auth/login',login);
}