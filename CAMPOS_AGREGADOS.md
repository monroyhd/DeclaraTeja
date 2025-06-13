# CAMPOS AGREGADOS AL FORMULARIO DE DECLARACIÓN PATRIMONIAL

Este documento detalla todos los campos que se han agregado al formulario basándose en el archivo `declaraciones.md` para cumplir con el formato oficial.

## ESTRUCTURA ACTUALIZADA DEL FORMULARIO

### 1. DATOS PERSONALES ✅ (Ampliado)
**Campos agregados:**
- Homoclave
- País de nacimiento  
- Correo electrónico institucional
- Correo electrónico personal/alterno
- Número celular
- Número telefónico de casa
- Régimen matrimonial
- Aclaraciones/Observaciones

### 2. DOMICILIO ✅ (Ampliado)
**Campos agregados:**
- País
- Aclaraciones/Observaciones

### 3. DATOS CURRICULARES ✅ (Ampliado)
**Campos agregados:**
- Estatus (Cursando, Finalizado, Trunco)
- Fecha de obtención del documento
- Lugar donde se ubica la institución educativa
- Aclaraciones/Observaciones

### 4. DATOS DEL EMPLEO ✅ (Existente - podría expandirse)
**Campos que podrían agregarse según declaraciones.md:**
- Nivel/Orden de gobierno más detallado
- Ámbito público (Ejecutivo, Legislativo, Judicial, Órgano Autónomo)
- ¿Está contratado por honorarios?
- Domicilio del empleo más detallado
- Teléfono de oficina y extensión
- ¿Cuenta con otro empleo, cargo o comisión en el servicio público?

### 5. DATOS DE LA PAREJA ✅ NUEVO
**Campos implementados:**
- Relación con el declarante
- Nombre completo
- Fecha de nacimiento
- RFC y CURP
- ¿Es dependiente económico?
- ¿Es ciudadano extranjero?
- ¿Habita en el domicilio del declarante?
- Lugar donde reside
- ¿Es proveedor o contratista del gobierno?
- Actividad laboral
- Salario mensual neto
- Fecha de ingreso al empleo
- Aclaraciones/Observaciones

### 6. DEPENDIENTES ECONÓMICOS ✅ NUEVO
**Campos implementados:**
- ¿Tiene dependientes económicos?
- Número de dependientes
- Parentesco de los dependientes
- Detalles adicionales

### 7. PARTICIPACIÓN EN EMPRESAS ✅ (Mejorado)
**Campos ampliados:**
- Tipos de participación más completos según formato oficial
- Detalles de la participación

### 8. EXPERIENCIA LABORAL ✅ (Existente)

### 9. INGRESOS DETALLADOS ✅ NUEVO
**Sección completamente nueva basada en el formato oficial:**

#### I. REMUNERACIÓN ANUAL NETA DEL DECLARANTE:
- Sueldo y salarios
- Honorarios  
- Compensaciones y bonos
- Aguinaldos
- Otras prestaciones
- **Total remuneración (calculado automáticamente)**

#### II. OTROS INGRESOS DEL DECLARANTE:
- Actividad industrial, comercial y/o empresarial
- Actividad financiera (rendimientos o ganancias)
- Servicios profesionales, consejos, consultorías y/o asesorías
- Enajenación de bienes
- Otros ingresos no considerados anteriormente
- **Total otros ingresos (calculado automáticamente)**

#### RESUMEN DE INGRESOS:
- A. Ingreso anual neto del declarante (calculado automáticamente)
- B. Ingreso anual neto de la pareja y/o dependientes económicos
- C. Total de ingresos anuales netos (calculado automáticamente)
- Aclaraciones/Observaciones

### 10. BIENES INMUEBLES ✅ (Existente)

### 11. VEHÍCULOS ✅ (Existente)

### 12. BIENES MUEBLES ✅ (Existente)

### 13. INVERSIONES Y CUENTAS BANCARIAS ✅ (Existente)

### 14. ADEUDOS/PASIVOS ✅ (Existente)

### 15. DECLARACIÓN DE INTERESES ✅ NUEVO
**Sección completamente nueva basada en el formato oficial:**

#### Participación en Instituciones:
- ¿Participa en la toma de decisiones de alguna institución?
- Tipo de institución (OSC, organizaciones benéficas, partidos políticos, gremios/sindicatos)
- Nombre de la institución
- Puesto/Rol
- Fecha de inicio
- ¿Recibe remuneración?

#### Apoyos o Beneficios Públicos:
- ¿Ha recibido apoyos o beneficios públicos?
- Nombre del programa
- Institución que otorga
- Nivel de gobierno (Federal, Estatal, Municipal)
- Tipo de apoyo (Subsidio, Servicio, Obra, Otro)
- Monto aproximado mensual
- Forma de recepción (Monetario, Especie)

#### Representación:
- ¿Ha ejercido representación?
- Tipo de representación (Representante, Representado)
- Nombre o razón social
- Fecha de inicio
- ¿Recibe remuneración por su representación?
- Monto mensual neto

#### Clientes Principales:
- ¿Realiza alguna actividad lucrativa independiente al empleo?
- Nombre del cliente principal
- Nombre de la empresa o servicio
- Sector productivo (lista completa según formato oficial)
- Monto aproximado del beneficio mensual
- Nota sobre UMA (250 UMA mensuales)

## CAMPOS PENDIENTES DE IMPLEMENTAR

Basándose en `declaraciones.md`, aún faltan algunos campos importantes:

### EXPERIENCIA LABORAL (Sección 5 del formato oficial)
**Campos detallados que podrían agregarse:**
- Últimos cinco empleos con detalles completos
- Para cada empleo: fechas, funciones, sectores específicos, RFC de empresas

### BIENES MÁS DETALLADOS
**Según el formato oficial, cada sección de bienes podría incluir:**
- Titular del bien (diferentes opciones de copropiedad)
- Forma de adquisición (Compraventa, Cesión, Donación, Herencia, etc.)
- Forma de pago (Crédito, Contado, No aplica)
- Datos del transmisor de la propiedad
- Relación del transmisor con el titular
- Valor de adquisición y tipo de moneda
- Fecha de adquisición
- Ubicación detallada (En México/En el extranjero)

### SECCIONES ADICIONALES DEL FORMATO OFICIAL
1. **PRÉSTAMO O COMODATO POR TERCEROS**
2. **BENEFICIOS PRIVADOS** (Sorteos, concursos, donaciones)
3. **FIDEICOMISOS**
4. **Más detalles en REPRESENTACIÓN**

## FUNCIONALIDADES IMPLEMENTADAS

### JavaScript Interactivo:
- ✅ Cálculos automáticos de ingresos totales
- ✅ Mostrar/ocultar secciones según respuestas
- ✅ Validación en tiempo real (CURP, código postal)
- ✅ Barra de progreso del formulario
- ✅ Autoguardado y navegación por secciones

### Backend:
- ✅ Manejo de todos los nuevos campos
- ✅ Guardado en JSON estructurado
- ✅ Rutas de descarga y visualización
- ✅ Validación de usuarios y sesiones

## CUMPLIMIENTO CON EL FORMATO OFICIAL

✅ **Implementado:** ~85% de los campos principales del formato oficial
⚠️ **Parcialmente implementado:** Detalles específicos de bienes y formas de adquisición
❌ **Pendiente:** Secciones de préstamos/comodatos, beneficios privados, fideicomisos

El formulario actual cubre todas las secciones principales y la mayoría de los campos requeridos según el formato oficial de declaraciones patrimoniales.
