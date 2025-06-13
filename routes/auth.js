const express = require('express');
const bcrypt = require('bcryptjs');
const fs = require('fs-extra');
const path = require('path');
const { validateRFC } = require('../utils/fileUtils');
const { requireNoAuth } = require('../middlewares/auth');
const router = express.Router();

const usersFile = path.join(__dirname, '..', 'data', 'users', 'users.json');

// Inicializar archivo de usuarios si no existe
const initUsersFile = async () => {
  if (!(await fs.pathExists(usersFile))) {
    await fs.writeJson(usersFile, []);
  }
};

// Obtener todos los usuarios
const getUsers = async () => {
  await initUsersFile();
  return await fs.readJson(usersFile);
};

// Guardar usuarios
const saveUsers = async (users) => {
  await fs.writeJson(usersFile, users, { spaces: 2 });
};

// Página de login
router.get('/login', requireNoAuth, (req, res) => {
  res.render('auth/login', { 
    title: 'Iniciar Sesión - Declara.net',
    error: null 
  });
});

// Procesar login
router.post('/login', requireNoAuth, async (req, res) => {
  try {
    const { rfc, password } = req.body;
    
    if (!rfc || !password) {
      return res.render('auth/login', { 
        title: 'Iniciar Sesión - Declara.net',
        error: 'RFC y contraseña son requeridos' 
      });
    }

    const users = await getUsers();
    const user = users.find(u => u.rfc.toUpperCase() === rfc.toUpperCase());
    
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.render('auth/login', { 
        title: 'Iniciar Sesión - Declara.net',
        error: 'RFC o contraseña incorrectos' 
      });
    }

    req.session.user = {
      rfc: user.rfc,
      nombre: user.nombre,
      email: user.email
    };

    res.redirect('/declarations');
  } catch (error) {
    console.error('Error en login:', error);
    res.render('auth/login', { 
      title: 'Iniciar Sesión - Declara.net',
      error: 'Error interno del servidor' 
    });
  }
});

// Página de registro
router.get('/register', requireNoAuth, (req, res) => {
  res.render('auth/register', { 
    title: 'Registro - Declara.net',
    error: null,
    success: null 
  });
});

// Procesar registro
router.post('/register', requireNoAuth, async (req, res) => {
  try {
    const { rfc, nombre, email, password, confirmPassword } = req.body;
    
    // Validaciones
    if (!rfc || !nombre || !email || !password || !confirmPassword) {
      return res.render('auth/register', { 
        title: 'Registro - Declara.net',
        error: 'Todos los campos son requeridos',
        success: null 
      });
    }

    if (!validateRFC(rfc)) {
      return res.render('auth/register', { 
        title: 'Registro - Declara.net',
        error: 'RFC inválido',
        success: null 
      });
    }

    if (password !== confirmPassword) {
      return res.render('auth/register', { 
        title: 'Registro - Declara.net',
        error: 'Las contraseñas no coinciden',
        success: null 
      });
    }

    if (password.length < 6) {
      return res.render('auth/register', { 
        title: 'Registro - Declara.net',
        error: 'La contraseña debe tener al menos 6 caracteres',
        success: null 
      });
    }

    const users = await getUsers();
    
    // Verificar si el usuario ya existe
    if (users.find(u => u.rfc.toUpperCase() === rfc.toUpperCase())) {
      return res.render('auth/register', { 
        title: 'Registro - Declara.net',
        error: 'Ya existe un usuario con este RFC',
        success: null 
      });
    }

    if (users.find(u => u.email.toLowerCase() === email.toLowerCase())) {
      return res.render('auth/register', { 
        title: 'Registro - Declara.net',
        error: 'Ya existe un usuario con este email',
        success: null 
      });
    }

    // Crear nuevo usuario
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      rfc: rfc.toUpperCase(),
      nombre,
      email: email.toLowerCase(),
      password: hashedPassword,
      fechaRegistro: new Date().toISOString()
    };

    users.push(newUser);
    await saveUsers(users);

    res.render('auth/register', { 
      title: 'Registro - Declara.net',
      error: null,
      success: 'Usuario registrado exitosamente. Ahora puedes iniciar sesión.' 
    });

  } catch (error) {
    console.error('Error en registro:', error);
    res.render('auth/register', { 
      title: 'Registro - Declara.net',
      error: 'Error interno del servidor',
      success: null 
    });
  }
});

// Logout
router.post('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;
