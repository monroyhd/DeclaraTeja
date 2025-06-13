# PRD - Sistema Web de Captura de Declaraciones Patrimoniales (Declara.net)

## 1. Visión General del Producto

**Declara.net** es un sistema web integral para la captura, gestión y almacenamiento de declaraciones patrimoniales. El sistema permite a los usuarios registrarse con su RFC, capturar información patrimonial detallada a través de formularios estructurados y generar archivos JSON organizados por año y usuario.

### 1.1 Objetivo Principal
Facilitar el proceso de captura y almacenamiento de declaraciones patrimoniales de manera digital, segura y organizada, eliminando el uso de formularios en papel y centralizando la información en formato JSON estructurado.

### 1.2 Usuarios Objetivo
- Servidores públicos que requieren presentar declaraciones patrimoniales
- Personal de recursos humanos que gestiona declaraciones
- Auditores y personal de transparencia
- Cualquier persona que necesite documentar su patrimonio de manera formal

## 2. Funcionalidades Principales

### 2.1 Sistema de Autenticación
- **Registro de usuarios**: Con RFC, nombre completo, email y contraseña
- **Validación de RFC**: Verificación automática del formato RFC mexicano
- **Inicio de sesión**: Autenticación por RFC y contraseña
- **Gestión de sesiones**: Sesiones seguras con expiración automática
- **Middleware de autenticación**: Protección de rutas privadas

### 2.2 Captura de Declaraciones Patrimoniales
El sistema captura información estructurada en 12 secciones principales:

#### Sección 1: Datos Personales
- **Campos requeridos**: Nombre(s), primer apellido, fecha de nacimiento, RFC, CURP, nacionalidad, estado civil
- **Campos opcionales**: Segundo apellido
- **Validaciones**: RFC y CURP con formato mexicano válido

#### Sección 2: Domicilio Particular
- **Información de ubicación**: Calle, números exterior/interior, colonia, municipio, entidad federativa, código postal
- **Validaciones**: Código postal de 5 dígitos

#### Sección 3: Datos del Empleo, Cargo o Comisión
- **Información laboral**: Institución, puesto, nivel, fecha de ingreso, salario mensual neto
- **Descripción**: Función principal del puesto

#### Sección 4: Experiencia Laboral
- **Sectores**: Checkboxes para sector público, privado y otros sectores
- **Descripción**: Campo de texto libre para detalles de experiencia

#### Sección 5: Datos Curriculares
- **Educación**: Nivel máximo de estudios, carrera, institución educativa, año de egreso, documento obtenido
- **Opciones**: Dropdown con niveles desde primaria hasta doctorado

#### Sección 6: Participación en Empresas
- **Participación**: Radio buttons para indicar participación
- **Tipos**: Checkboxes múltiples (accionista, socio, miembro del consejo, representante)
- **Detalles**: Campo de texto para descripción

#### Sección 7: Bienes Inmuebles
- **Casa habitación**: Valor, superficie, ubicación
- **Otros inmuebles**: Cantidad, valor total, descripción
- **Controles dinámicos**: Campos se muestran/ocultan según selección

#### Sección 8: Vehículos
- **Información**: Cantidad, valor total, descripción
- **Control condicional**: Campos visibles solo si posee vehículos

#### Sección 9: Bienes Muebles
- **Bienes de valor**: Valor total, descripción de bienes muebles significativos

#### Sección 10: Inversiones y Cuentas Bancarias
- **Cuentas bancarias**: Número de productos, monto total
- **Inversiones**: Tipos múltiples (acciones, bonos, fondos, CETES), monto total

#### Sección 11: Adeudos
- **Tipos de adeudos**: Hipotecarios, personales, tarjetas de crédito, otros
- **Montos**: Campos monetarios para cada tipo
- **Descripción**: Detalles de otros adeudos

#### Sección 12: Ingresos Netos del Declarante
- **Tipos de ingresos**: Sueldos, honorarios, actividad financiera, comercial, otros
- **Cálculo automático**: Total de ingresos se calcula dinámicamente
- **Validación**: Todos los campos monetarios con formato decimal

### 2.3 Características de la Interfaz

#### Formulario Inteligente
- **Barra de progreso**: Indicador visual del porcentaje de completado
- **Campos condicionales**: Secciones que se muestran/ocultan según respuestas
- **Validación en tiempo real**: Validación inmediata de RFC, CURP, códigos postales
- **Formato monetario**: Campos de dinero con símbolo de peso y formato decimal
- **Responsive design**: Compatible con dispositivos móviles y desktop

#### Experiencia de Usuario
- **Navegación clara**: Menú de navegación con estado activo
- **Alertas informativas**: Mensajes de éxito y error claramente visibles
- **Iconografía intuitiva**: FontAwesome icons para mejor UX
- **Bootstrap 5**: Framework CSS moderno para diseño consistente

### 2.4 Gestión de Archivos JSON

#### Estructura de Almacenamiento
```
data/
├── declarations/
│   └── [RFC_USUARIO]/
│       ├── 2025_[RFC_USUARIO].json
│       ├── 2024_[RFC_USUARIO].json
│       └── ...
└── users/
    └── users.json
```

#### Formato del Archivo JSON
```json
{
  "rfc": "USUARIO123ABC",
  "year": 2025,
  "fechaCaptura": "2025-06-12T10:30:00.000Z",
  "datos": {
    "datosPersonales": { ... },
    "domicilio": { ... },
    "empleo": { ... },
    "experienciaLaboral": { ... },
    "datosCurriculares": { ... },
    "participacionEmpresas": { ... },
    "bienesInmuebles": { ... },
    "vehiculos": { ... },
    "bienesMuebles": { ... },
    "inversionesCuentas": { ... },
    "adeudos": { ... },
    "ingresos": { ... }
  }
}
```

#### Nomenclatura de Archivos
- **Formato**: `{AÑO}_{RFC}.json`
- **Ejemplo**: `2025_ABCD123456EFG.json`
- **Organización**: Un directorio único por usuario (RFC)

### 2.5 Visualización de Declaraciones

#### Lista de Declaraciones
- **Vista de tarjetas**: Cada declaración como una tarjeta con información clave
- **Información mostrada**: Año, RFC, fecha de captura, nombre, institución
- **Acciones disponibles**: Ver detalle, descargar JSON
- **Estado vacío**: Mensaje y call-to-action cuando no hay declaraciones

#### Vista Detallada
- **Información completa**: Todas las secciones de la declaración organizadas visualmente
- **Formato de lectura**: Diseño optimizado para visualización, no edición
- **Funciones de exportación**: Botón de impresión y descarga de JSON
- **Valores monetarios**: Formato de moneda mexicana con comas y decimales
- **Badges informativos**: Indicadores visuales para campos booleanos

### 2.6 Funcionalidades de Descarga e Impresión

#### Descarga de JSON
- **Endpoint dedicado**: `/declarations/download/:year/:rfc`
- **Validación de permisos**: Solo el propietario puede descargar sus archivos
- **Headers apropiados**: Content-Type y Content-Disposition para descarga automática
- **Nombre de archivo**: Formato estándar `declaracion_{año}_{rfc}.json`

#### Impresión
- **CSS de impresión**: Estilos optimizados para impresión en papel
- **Elementos ocultos**: Navegación y botones no aparecen al imprimir
- **Botón flotante**: Acceso rápido a función de impresión
- **Formato profesional**: Layout limpio y profesional para documentos físicos

## 3. Aspectos Técnicos

### 3.1 Arquitectura del Sistema
- **Backend**: Node.js con Express.js
- **Frontend**: EJS templates con Bootstrap 5
- **Almacenamiento**: Sistema de archivos JSON (sin base de datos)
- **Sesiones**: express-session para manejo de autenticación
- **Validaciones**: Servidor y cliente side

### 3.2 Estructura de Directorios
```
Declara_net/
├── app.js                  # Configuración principal de Express
├── package.json           # Dependencias del proyecto
├── bin/www                # Punto de entrada del servidor
├── data/                  # Almacenamiento de datos
│   ├── declarations/      # Declaraciones por usuario
│   └── users/            # Archivo de usuarios
├── middlewares/          # Middleware personalizado
│   └── auth.js          # Autenticación y autorización
├── routes/              # Rutas del sistema
│   ├── index.js        # Página principal
│   ├── auth.js         # Autenticación
│   ├── declarations.js  # Gestión de declaraciones
│   └── users.js        # Gestión de usuarios
├── utils/               # Utilidades
│   └── fileUtils.js    # Manejo de archivos JSON
├── views/               # Templates EJS
│   ├── index.ejs       # Página principal
│   ├── layout.ejs      # Layout base
│   ├── error.ejs       # Página de error
│   ├── auth/           # Vistas de autenticación
│   │   ├── login.ejs
│   │   └── register.ejs
│   └── declarations/   # Vistas de declaraciones
│       ├── index.ejs   # Lista de declaraciones
│       ├── form.ejs    # Formulario de captura
│       └── view.ejs    # Vista detallada
└── public/             # Recursos estáticos
    ├── images/
    ├── javascripts/
    └── stylesheets/
        └── style.css
```

### 3.3 Dependencias Principales
- **express**: Framework web
- **ejs**: Motor de templates
- **express-session**: Manejo de sesiones
- **bcryptjs**: Encriptación de contraseñas
- **fs-extra**: Operaciones de archivos mejoradas
- **validator**: Validaciones
- **multer**: Manejo de archivos (preparado para futuras funcionalidades)

### 3.4 Seguridad
- **Validación de entrada**: Validación tanto en cliente como en servidor
- **Autenticación**: Sistema de login con contraseñas encriptadas
- **Autorización**: Usuarios solo pueden acceder a sus propias declaraciones
- **Validación de RFC**: Verificación de formato de RFC mexicano
- **Sanitización**: Prevención de inyección de datos maliciosos

## 4. Flujo de Usuario

### 4.1 Registro e Inicio de Sesión
1. Usuario accede a la página principal
2. Selecciona "Registrarse"
3. Completa formulario con RFC, nombre, email y contraseña
4. Sistema valida RFC y crea cuenta
5. Usuario puede iniciar sesión con RFC y contraseña

### 4.2 Creación de Declaración
1. Usuario autenticado accede a "Nueva Declaración"
2. Completa formulario sección por sección
3. Sistema valida campos en tiempo real
4. Usuario puede ver progreso en barra superior
5. Al enviar, sistema genera archivo JSON único
6. Confirmación de guardado exitoso

### 4.3 Gestión de Declaraciones
1. Usuario accede a "Mis Declaraciones"
2. Ve lista de todas sus declaraciones por año
3. Puede ver detalles de cualquier declaración
4. Puede descargar archivo JSON original
5. Puede imprimir declaración para archivos físicos

## 5. Casos de Uso

### 5.1 Servidor Público
**Escenario**: Un funcionario público debe presentar su declaración patrimonial anual
- Accede al sistema con su RFC
- Completa formulario con toda su información patrimonial
- Sistema genera archivo JSON con formato estándar
- Puede descargar o imprimir para presentar ante la autoridad correspondiente

### 5.2 Actualización Anual
**Escenario**: Usuario actualiza su declaración cada año
- Inicia sesión en el sistema
- Crea nueva declaración para el año actual
- Puede consultar declaraciones de años anteriores para referencia
- Mantiene historial completo de sus declaraciones

### 5.3 Auditoría y Transparencia
**Escenario**: Revisión de declaraciones patrimoniales
- Archivos JSON pueden ser procesados por sistemas de auditoría
- Formato estándar facilita análisis automatizado
- Información organizada y estructurada

## 6. Beneficios del Sistema

### 6.1 Para los Usuarios
- **Facilidad de uso**: Interfaz intuitiva y guiada
- **Validación automática**: Prevención de errores comunes
- **Almacenamiento seguro**: Información protegida y organizada
- **Accesibilidad**: Disponible 24/7 desde cualquier dispositivo
- **Historial completo**: Acceso a declaraciones de años anteriores

### 6.2 Para las Instituciones
- **Formato estándar**: Archivos JSON estructurados y procesables
- **Reducción de papel**: Digitalización completa del proceso
- **Facilidad de auditoría**: Datos organizados y fáciles de analizar
- **Ahorro de tiempo**: Proceso automatizado de captura
- **Transparencia**: Sistema auditable y trazable

### 6.3 Técnicos
- **Escalabilidad**: Arquitectura simple y escalable
- **Mantenibilidad**: Código organizado y documentado
- **Flexibilidad**: Fácil adición de nuevos campos o funcionalidades
- **Portabilidad**: Archivos JSON compatibles con cualquier sistema
- **Backup simple**: Archivos de datos fáciles de respaldar

## 7. Futuras Mejoras

### 7.1 Funcionalidades Potenciales
- **Base de datos**: Migración a PostgreSQL o MongoDB
- **API REST**: Exposición de endpoints para integración
- **Reportes**: Generación de reportes en PDF
- **Notificaciones**: Recordatorios de actualización anual
- **Importación**: Carga masiva de datos desde Excel
- **Firma digital**: Integración con certificados digitales
- **Multi-idioma**: Soporte para múltiples idiomas
- **Dashboard**: Panel de estadísticas y análisis

### 7.2 Mejoras de Seguridad
- **HTTPS obligatorio**: Encriptación en tránsito
- **2FA**: Autenticación de dos factores
- **Logging**: Registro de auditoría de acciones
- **Rate limiting**: Protección contra ataques de fuerza bruta
- **RBAC**: Control de acceso basado en roles

### 7.3 Optimizaciones
- **Caching**: Sistema de caché para mejor rendimiento
- **CDN**: Distribución de contenido estático
- **Compresión**: Compresión de archivos JSON
- **Lazy loading**: Carga diferida de elementos de la interfaz
- **Progressive Web App**: Funcionalidad offline

## 8. Consideraciones de Implementación

### 8.1 Requisitos del Servidor
- **Node.js**: Versión 14 o superior
- **Memoria RAM**: Mínimo 2GB
- **Almacenamiento**: 10GB para comenzar (escalable según usuarios)
- **Ancho de banda**: Dependiente del número de usuarios concurrentes

### 8.2 Configuración de Producción
- **Variables de entorno**: Para configuraciones sensibles
- **Proxy reverso**: Nginx o Apache para manejo de tráfico
- **Certificados SSL**: Para comunicación segura
- **Monitoreo**: Sistema de logs y alertas
- **Backup automático**: Respaldo regular de archivos de datos

### 8.3 Mantenimiento
- **Actualizaciones regulares**: Parches de seguridad y mejoras
- **Monitoreo de performance**: Análisis de uso y optimización
- **Backup y recuperación**: Procedimientos de respaldo y restauración
- **Documentación**: Manuales de usuario y administrador

---

**Versión del documento**: 1.0  
**Fecha**: Junio 2025  
**Autor**: Sistema Declara.net  
**Estado**: Implementado y funcional
