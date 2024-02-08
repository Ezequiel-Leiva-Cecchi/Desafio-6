// session.routes.js
import { Router } from "express";
import passport from "passport";
const sessionRoutes = Router();

sessionRoutes.post('/register', passport.authenticate('register', { failureRedirect: '/failregister' }), (req, res) => {
    res.redirect('/');
});

sessionRoutes.get('/failregister', (req, res) => {
    res.status(400).send({ error: 'error to register' });
});

sessionRoutes.post('/login', passport.authenticate('login', { failureRedirect: '/faillogin' }), (req, res) => {
    res.redirect('/'); 
});

sessionRoutes.get('/faillogin', (req, res) => {
    res.status(401).json({ message: 'Invalid credentials' }); 
});

sessionRoutes.get('/logout', (req, res) => {
    req.session.destroy((error) => {
        if (error) {
            return res.status(500).json({ message: 'Logout failed' });
        }
        res.redirect('/login');
    });
});

sessionRoutes.post('/logout', (req, res) => {
    req.session.destroy((error) => {
        if (error) {
            return res.status(500).json({ message: 'Logout failed' });
        }
        res.json({ redirect: '/login' });
    });
});

sessionRoutes.get('/github', passport.authenticate('github', { scope: ['user:email'] }), (req, res) => { });

sessionRoutes.get('/githubcallback', passport.authenticate('github', { failureRedirect: '/login' }), (req, res) => {
    res.redirect('/');
});

export default sessionRoutes;
