import { Router } from "express";
import { usersService } from "../dao/index.js";

const router = Router();

router.post('/signup', async (req, res) => {
    const signupForm = req.body;
    try {
        if (signupForm.email === 'adminCoder@coder.com') {
            signupForm.role = 'admin'; 
        } else {
            signupForm.role = 'usuario'; 
        }

        const result = await usersService.createUser(signupForm);
        res.render('loginView', { message: 'Usuario registrado correctamente' });
    } catch (error) {
        res.render('signupView', { error: 'No se pudo registrar el usuario' });
    }
});

router.post('/login', async (req, res) => {
    const loginForm = req.body;

    if (loginForm.email === 'adminCoder@coder.com' && loginForm.password === 'adminCod3r123') {
        // Si las credenciales son para el usuario "admin", establecer el rol como "admin"
        req.session.email = loginForm.email;
        req.session.role = 'admin';
        res.redirect('/products');
    } else {
        try {
            const user = await usersService.getUserByEmail(loginForm.email);
            if (!user) {
                return res.render('loginView', { error: 'Este usuario no está registrado' });
            }

            // Verificar que el usuario tiene una propiedad 'email'
            if (user.email && user.password === loginForm.password) {
                // Usuario existe y contraseña válida, entonces creamos la sesión del usuario
                req.session.email = user.email;
                req.session.role = 'usuario'; 
                req.session.first_name = user.first_name; 
                res.redirect('/products');
            } else {
                res.render('loginView', { error: 'Credenciales inválidas' });
            }
        } catch (error) {
            console.error(error);
            res.render('loginView', { error: 'No se pudo iniciar sesión para este usuario' });
        }
    }
});

router.get("/logout", async(req,res)=>{
    try {
        req.session.destroy(err=>{
            if(err) return res.render("profileView",{error:"No se pudo cerrar la sesion"});
            res.redirect("/");
        })
    } catch (error) {
        res.render("signupView",{error:"No se pudo registrar el usuario"});
    }
});

export {router as sessionsRouter};