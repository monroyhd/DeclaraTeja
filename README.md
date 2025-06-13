# DeclaraTEJA

Sistema Web de Captura de Declaraciones Patrimoniales y de Intereses del Tribunal Estatal de Justicia Administrativa de Baja California (TEJABC).

## 📋 Descripción

DeclaraTEJA es un sistema web integral que permite a los servidores públicos registrarse y capturar sus declaraciones patrimoniales de manera digital, segura y organizada, cumpliendo con las obligaciones de transparencia establecidas por la normatividad vigente.

## 🏛️ Institución

**Tribunal Estatal de Justicia Administrativa de Baja California (TEJABC)**
- Sitio web oficial: [https://tejabc.mx](https://tejabc.mx)
- Email: buzon.pleno@tejabc.mx

## ✨ Características Principales

- 🔐 **Sistema de Autenticación**: Registro y login con RFC
- 📝 **Formulario Completo**: 12 secciones según formato oficial
- 💾 **Almacenamiento JSON**: Datos organizados por año y usuario
- 🎨 **Diseño Institucional**: Colores y estilo oficial del TEJABC
- 📱 **Responsive**: Compatible con dispositivos móviles
- 🛡️ **Seguridad**: Validación de datos y protección de información

## 🚀 Instalación

### Prerrequisitos
- Node.js (v14 o superior)
- npm (v6 o superior)

### Pasos de instalación

1. **Clonar el repositorio:**
```bash
git clone [URL_DEL_REPOSITORIO]
cd Declara_net
```

2. **Instalar dependencias:**
```bash
npm install
```

3. **Crear directorios necesarios:**
```bash
mkdir -p data/users
mkdir -p data/declarations
```

4. **Iniciar el servidor:**
```bash
npm start
```

5. **Acceder al sistema:**
Abrir navegador en: `http://localhost:3030`

## 📁 Estructura del Proyecto

```
Declara_net/
├── app.js              # Aplicación principal Express
├── package.json        # Dependencias y scripts
├── README.md          # Este archivo
├── PRD.md             # Documento de requisitos
├── declaraciones.md   # Especificación de campos
├── bin/
│   └── www            # Script de inicio del servidor
├── data/              # EXCLUIDO DE GIT
│   ├── users/         # Datos de usuarios (JSON)
│   └── declarations/  # Declaraciones por año/usuario
├── middlewares/
│   └── auth.js        # Middleware de autenticación
├── public/
│   ├── images/        # Imágenes y favicon
│   ├── javascripts/   # Scripts del cliente
│   └── stylesheets/   # Hojas de estilo
├── routes/
│   ├── index.js       # Rutas principales
│   ├── auth.js        # Rutas de autenticación
│   ├── declarations.js# Rutas de declaraciones
│   └── users.js       # Rutas de usuarios
├── utils/
│   └── fileUtils.js   # Utilidades para archivos
└── views/
    ├── layout.ejs     # Layout principal
    ├── index.ejs      # Página de inicio
    ├── error.ejs      # Página de errores
    ├── auth/          # Vistas de autenticación
    └── declarations/  # Vistas de declaraciones
```

## 🎯 Funcionalidades

### Secciones del Formulario

1. **Datos Personales** - Información básica del declarante
2. **Domicilio Particular** - Dirección de residencia
3. **Datos del Empleo** - Información laboral actual
4. **Experiencia Laboral** - Sectores de experiencia
5. **Datos Curriculares** - Formación académica
6. **Participación en Empresas** - Sociedades y participaciones
7. **Bienes Inmuebles** - Propiedades y terrenos
8. **Bienes Muebles** - Vehículos y otros bienes
9. **Inversiones y Valores** - Cuentas e inversiones
10. **Adeudos y Pasivos** - Deudas y obligaciones
11. **Ingresos Netos** - Remuneraciones y ingresos
12. **Información Adicional** - Observaciones generales

### Validaciones Implementadas

- ✅ RFC con formato mexicano válido
- ✅ CURP con formato mexicano válido
- ✅ Códigos postales de 5 dígitos
- ✅ Campos requeridos marcados
- ✅ Formatos de moneda
- ✅ Validación de fechas

## 🎨 Diseño Visual

El sistema utiliza la paleta de colores oficial del TEJABC:

- **Azul Institucional**: `#1a4b84`
- **Azul Oscuro**: `#0f3460`
- **Dorado**: `#f59e0b`
- **Verde**: `#059669`
- **Rojo**: `#b91c1c`

## 📊 Almacenamiento de Datos

Los datos se almacenan en formato JSON en la estructura:
```
data/
├── users/
│   └── [RFC].json     # Datos del usuario
└── declarations/
    └── [AÑO]/
        └── [RFC].json # Declaración del año
```

## 🔒 Seguridad

- Contraseñas encriptadas con bcrypt
- Sesiones seguras con express-session
- Validación de entrada en servidor
- Middleware de autenticación
- Protección contra inyecciones

## 🛠️ Tecnologías Utilizadas

- **Backend**: Node.js, Express.js
- **Frontend**: EJS, Bootstrap 5, FontAwesome
- **Autenticación**: bcryptjs, express-session
- **Validación**: Validaciones personalizadas
- **Estilos**: CSS3, Bootstrap, diseño responsive

## 👥 Contribución

Este es un sistema oficial del TEJABC. Para contribuciones:

1. Fork del repositorio
2. Crear rama para feature (`git checkout -b feature/NuevaFuncionalidad`)
3. Commit de cambios (`git commit -m 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/NuevaFuncionalidad`)
5. Crear Pull Request

## 📄 Licencia

Sistema propietario del Tribunal Estatal de Justicia Administrativa de Baja California.

## 📞 Contacto

Para soporte técnico o consultas:
- **Email**: buzon.pleno@tejabc.mx
- **Sitio Web**: [https://tejabc.mx](https://tejabc.mx)
- **Transparencia**: [https://tejabc.mx/transparencia](https://tejabc.mx/transparencia)

---

**© 2025 Tribunal Estatal de Justicia Administrativa de Baja California**
