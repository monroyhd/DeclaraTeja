const express = require('express');
const { requireAuth } = require('../middlewares/auth');
const { saveDeclaration, getUserDeclarations } = require('../utils/fileUtils');
const router = express.Router();

// Aplicar middleware de autenticación a todas las rutas
router.use(requireAuth);

// Lista de declaraciones del usuario
router.get('/', async (req, res) => {
  try {
    const declarations = await getUserDeclarations(req.session.user.rfc);
    res.render('declarations/index', { 
      title: 'Mis Declaraciones - Declara.net',
      user: req.session.user,
      declarations 
    });
  } catch (error) {
    console.error('Error al obtener declaraciones:', error);
    res.render('declarations/index', { 
      title: 'Mis Declaraciones - Declara.net',
      user: req.session.user,
      declarations: [],
      error: 'Error al cargar las declaraciones'
    });
  }
});

// Formulario de nueva declaración
router.get('/new', (req, res) => {
  const currentYear = new Date().getFullYear();
  res.render('declarations/form', { 
    title: 'Nueva Declaración - Declara.net',
    user: req.session.user,
    year: currentYear,
    error: null,
    success: null
  });
});

// Procesar nueva declaración
router.post('/new', async (req, res) => {
  try {
    const year = parseInt(req.body.year) || new Date().getFullYear();
    const declarationData = {
      // Datos personales
      datosPersonales: {
        nombre: req.body.nombre,
        primerApellido: req.body.primerApellido,
        segundoApellido: req.body.segundoApellido,
        fechaNacimiento: req.body.fechaNacimiento,
        rfc: req.body.rfc,
        curp: req.body.curp,
        homoclave: req.body.homoclave,
        nacionalidad: req.body.nacionalidad,
        paisNacimiento: req.body.paisNacimiento,
        estadoCivil: req.body.estadoCivil,
        regimenMatrimonial: req.body.regimenMatrimonial,
        correoInstitucional: req.body.correoInstitucional,
        correoPersonal: req.body.correoPersonal,
        telefonoCelular: req.body.telefonoCelular,
        telefonoCasa: req.body.telefonoCasa,
        aclaracionesPersonales: req.body.aclaracionesPersonales
      },
      
      // Domicilio
      domicilio: {
        calle: req.body.calle,
        numeroExterior: req.body.numeroExterior,
        numeroInterior: req.body.numeroInterior,
        colonia: req.body.colonia,
        municipio: req.body.municipio,
        entidadFederativa: req.body.entidadFederativa,
        codigoPostal: req.body.codigoPostal,
        pais: req.body.pais,
        aclaracionesDomicilio: req.body.aclaracionesDomicilio
      },
      
      // Datos curriculares
      datosCurriculares: {
        nivelMaximoEstudios: req.body.nivelMaximoEstudios,
        carrera: req.body.carrera,
        institucionEducativa: req.body.institucionEducativa,
        estatusEducativo: req.body.estatusEducativo,
        añoEgreso: parseInt(req.body.añoEgreso) || null,
        documentoObtenido: req.body.documentoObtenido,
        fechaObtencionDocumento: req.body.fechaObtencionDocumento,
        lugarInstitucion: req.body.lugarInstitucion,
        aclaracionesCurriculares: req.body.aclaracionesCurriculares
      },
      
      // Datos del empleo
      empleo: {
        institucion: req.body.institucion,
        puesto: req.body.puesto,
        nivel: req.body.nivel,
        fechaIngreso: req.body.fechaIngreso,
        funcionPrincipal: req.body.funcionPrincipal,
        salarioMensualNeto: parseFloat(req.body.salarioMensualNeto) || 0,
        nivelGobierno: req.body.nivelGobierno,
        ambitoPublico: req.body.ambitoPublico,
        areaAdscripcion: req.body.areaAdscripcion,
        contratadoHonorarios: req.body.contratadoHonorarios,
        telefonoOficina: req.body.telefonoOficina
      },
      
      // Datos de la pareja
      pareja: {
        tienePareja: req.body.tienePareja === 'si',
        nombrePareja: req.body.nombrePareja,
        primerApellidoPareja: req.body.primerApellidoPareja,
        segundoApellidoPareja: req.body.segundoApellidoPareja,
        relacionDeclarante: req.body.relacionDeclarante,
        fechaNacimientoPareja: req.body.fechaNacimientoPareja,
        rfcPareja: req.body.rfcPareja,
        curpPareja: req.body.curpPareja,
        parejaEsDependiente: req.body.parejaEsDependiente === 'si',
        parejaEsExtranjero: req.body.parejaEsExtranjero === 'si',
        parejaHabitaDomicilio: req.body.parejaHabitaDomicilio === 'si',
        lugarResidePareja: req.body.lugarResidePareja,
        parejaProveedorGob: req.body.parejaProveedorGob === 'si',
        actividadLaboralPareja: req.body.actividadLaboralPareja,
        salarioMensualPareja: parseFloat(req.body.salarioMensualPareja) || 0,
        fechaIngresoEmpleoPareja: req.body.fechaIngresoEmpleoPareja,
        aclaracionesPareja: req.body.aclaracionesPareja
      },
      
      // Dependientes económicos
      dependientes: {
        tieneDependientes: req.body.tieneDependientes === 'si',
        numeroDependientes: parseInt(req.body.numeroDependientes) || 0,
        parentescoDependientes: req.body.parentescoDependientes,
        detallesDependientes: req.body.detallesDependientes
      },
      
      // Experiencia laboral
      experienciaLaboral: {
        sectorPublico: req.body.sectorPublico === 'si',
        sectorPrivado: req.body.sectorPrivado === 'si',
        otrosSectores: req.body.otrosSectores === 'si',
        detallesExperiencia: req.body.detallesExperiencia
      },
      
      // Participación en empresas
      participacionEmpresas: {
        participaEnEmpresas: req.body.participaEnEmpresas === 'si',
        tipoParticipacion: Array.isArray(req.body.tipoParticipacion) ? req.body.tipoParticipacion : 
                          (req.body.tipoParticipacion ? [req.body.tipoParticipacion] : []),
        detallesParticipacion: req.body.detallesParticipacion
      },
      
      // Ingresos detallados
      ingresosDetallados: {
        remuneracion: {
          sueldoSalarios: parseFloat(req.body.sueldoSalarios) || 0,
          honorarios: parseFloat(req.body.honorarios) || 0,
          compensacionesBonos: parseFloat(req.body.compensacionesBonos) || 0,
          aguinaldos: parseFloat(req.body.aguinaldos) || 0,
          otrasPrestaciones: parseFloat(req.body.otrasPrestaciones) || 0,
          totalRemuneracion: parseFloat(req.body.totalRemuneracion) || 0
        },
        otrosIngresos: {
          actividadIndustrial: parseFloat(req.body.actividadIndustrial) || 0,
          actividadFinanciera: parseFloat(req.body.actividadFinanciera) || 0,
          serviciosProfesionales: parseFloat(req.body.serviciosProfesionales) || 0,
          enajenacionBienes: parseFloat(req.body.enajenacionBienes) || 0,
          otrosIngresosNoConsiderados: parseFloat(req.body.otrosIngresosNoConsiderados) || 0,
          totalOtrosIngresos: parseFloat(req.body.totalOtrosIngresos) || 0
        },
        resumen: {
          ingresoAnualNetoDeclarante: parseFloat(req.body.ingresoAnualNetoDeclarante) || 0,
          ingresoAnualParejaDepend: parseFloat(req.body.ingresoAnualParejaDepend) || 0,
          totalIngresosAnuales: parseFloat(req.body.totalIngresosAnuales) || 0
        },
        aclaracionesIngresos: req.body.aclaracionesIngresos
      },
      
      // Bienes inmuebles
      bienesInmuebles: {
        casaHabitacion: {
          tiene: req.body.casaHabitacion === 'si',
          valor: parseFloat(req.body.valorCasaHabitacion) || 0,
          ubicacion: req.body.ubicacionCasaHabitacion,
          superficie: parseFloat(req.body.superficieCasaHabitacion) || 0
        },
        otrosInmuebles: {
          tiene: req.body.otrosInmuebles === 'si',
          cantidad: parseInt(req.body.cantidadOtrosInmuebles) || 0,
          valorTotal: parseFloat(req.body.valorOtrosInmuebles) || 0,
          descripcion: req.body.descripcionOtrosInmuebles
        }
      },
      
      // Vehículos
      vehiculos: {
        tieneVehiculos: req.body.tieneVehiculos === 'si',
        cantidad: parseInt(req.body.cantidadVehiculos) || 0,
        valorTotal: parseFloat(req.body.valorVehiculos) || 0,
        descripcion: req.body.descripcionVehiculos
      },
      
      // Bienes muebles
      bienesMuebles: {
        tieneBienesMuebles: req.body.tieneBienesMuebles === 'si',
        valorTotal: parseFloat(req.body.valorBienesMuebles) || 0,
        descripcion: req.body.descripcionBienesMuebles
      },
      
      // Inversiones y cuentas bancarias
      inversionesCuentas: {
        cuentasBancarias: {
          tiene: req.body.cuentasBancarias === 'si',
          numeroProductos: parseInt(req.body.numeroCuentasBancarias) || 0,
          montoTotal: parseFloat(req.body.montoCuentasBancarias) || 0
        },
        inversionesValores: {
          tiene: req.body.inversionesValores === 'si',
          montoTotal: parseFloat(req.body.montoInversionesValores) || 0,
          tipoInversiones: Array.isArray(req.body.tipoInversiones) ? req.body.tipoInversiones : 
                          (req.body.tipoInversiones ? [req.body.tipoInversiones] : [])
        }
      },
      
      // Adeudos
      adeudos: {
        tieneAdeudos: req.body.tieneAdeudos === 'si',
        adeudosHipotecarios: {
          tiene: req.body.adeudosHipotecarios === 'si',
          monto: parseFloat(req.body.montoAdeudosHipotecarios) || 0
        },
        adeudosPersonales: {
          tiene: req.body.adeudosPersonales === 'si',
          monto: parseFloat(req.body.montoAdeudosPersonales) || 0
        },
        tarjetasCredito: {
          tiene: req.body.tarjetasCredito === 'si',
          monto: parseFloat(req.body.montoTarjetasCredito) || 0
        },
        otrosAdeudos: {
          tiene: req.body.otrosAdeudos === 'si',
          monto: parseFloat(req.body.montoOtrosAdeudos) || 0,
          descripcion: req.body.descripcionOtrosAdeudos
        }
      },
      
      // Declaración de intereses
      declaracionIntereses: {
        participacionInstituciones: {
          participa: req.body.participaInstituciones === 'si',
          tipoInstitucion: req.body.tipoInstitucion,
          nombreInstitucion: req.body.nombreInstitucion,
          puestoInstitucion: req.body.puestoInstitucion,
          fechaInicioInstitucion: req.body.fechaInicioInstitucion,
          remuneracionInstitucion: req.body.remuneracionInstitucion === 'si'
        },
        beneficiosPublicos: {
          recibeBeneficios: req.body.recibeBeneficios === 'si',
          nombrePrograma: req.body.nombrePrograma,
          institucionOtorga: req.body.institucionOtorga,
          nivelGobiernoApoyo: req.body.nivelGobiernoApoyo,
          tipoApoyo: req.body.tipoApoyo,
          montoApoyo: parseFloat(req.body.montoApoyo) || 0,
          formaRecepcionApoyo: req.body.formaRecepcionApoyo
        },
        representacion: {
          ejerceRepresentacion: req.body.ejerceRepresentacion === 'si',
          tipoRepresentacion: req.body.tipoRepresentacion,
          nombreRepresentado: req.body.nombreRepresentado,
          fechaInicioRepresentacion: req.body.fechaInicioRepresentacion,
          remuneracionRepresentacion: req.body.remuneracionRepresentacion === 'si',
          montoRepresentacion: parseFloat(req.body.montoRepresentacion) || 0
        },
        clientesPrincipales: {
          actividadLucrativa: req.body.actividadLucrativa === 'si',
          nombreClientePrincipal: req.body.nombreClientePrincipal,
          nombreEmpresaServicio: req.body.nombreEmpresaServicio,
          sectorProductivoCliente: req.body.sectorProductivoCliente,
          montoBeneficioCliente: parseFloat(req.body.montoBeneficioCliente) || 0
        },
        aclaracionesIntereses: req.body.aclaracionesIntereses
      },
      
      // Ingresos netos del declarante (legacy para compatibilidad)
      ingresos: {
        sueldoSalarios: parseFloat(req.body.sueldoSalarios) || 0,
        honorarios: parseFloat(req.body.honorarios) || 0,
        actividadFinanciera: parseFloat(req.body.actividadFinanciera) || 0,
        actividadComercial: parseFloat(req.body.actividadComercial) || 0,
        otrosIngresos: parseFloat(req.body.otrosIngresos) || 0,
        ingresosTotales: parseFloat(req.body.ingresosTotales) || 0
      }
    };

    const filePath = await saveDeclaration(req.session.user.rfc, year, declarationData);
    
    res.render('declarations/form', { 
      title: 'Nueva Declaración - Declara.net',
      user: req.session.user,
      year: year,
      error: null,
      success: `Declaración guardada exitosamente. Archivo generado: ${filePath.split('/').pop()}`
    });

  } catch (error) {
    console.error('Error al guardar declaración:', error);
    const currentYear = new Date().getFullYear();
    res.render('declarations/form', { 
      title: 'Nueva Declaración - Declara.net',
      user: req.session.user,
      year: currentYear,
      error: 'Error al guardar la declaración. Por favor, intente nuevamente.',
      success: null
    });
  }
});

// Ver detalle de una declaración
router.get('/view/:year/:rfc', async (req, res) => {
  try {
    const { year, rfc } = req.params;
    
    // Verificar que el usuario solo pueda ver sus propias declaraciones
    if (rfc.toUpperCase() !== req.session.user.rfc.toUpperCase()) {
      return res.status(403).send('No autorizado');
    }
    
    const declarations = await getUserDeclarations(req.session.user.rfc);
    const declaration = declarations.find(d => d.year === parseInt(year));
    
    if (!declaration) {
      return res.status(404).send('Declaración no encontrada');
    }
    
    res.render('declarations/view', { 
      title: `Declaración ${year} - Declara.net`,
      user: req.session.user,
      declaration 
    });
    
  } catch (error) {
    console.error('Error al ver declaración:', error);
    res.status(500).send('Error interno del servidor');
  }
});

// Descargar declaración en formato JSON
router.get('/download/:year/:rfc', async (req, res) => {
  try {
    const { year, rfc } = req.params;
    
    // Verificar que el usuario solo pueda descargar sus propias declaraciones
    if (rfc.toUpperCase() !== req.session.user.rfc.toUpperCase()) {
      return res.status(403).send('No autorizado');
    }
    
    const declarations = await getUserDeclarations(req.session.user.rfc);
    const declaration = declarations.find(d => d.year === parseInt(year));
    
    if (!declaration) {
      return res.status(404).send('Declaración no encontrada');
    }
    
    // Configurar headers para descarga
    const filename = `declaracion_${year}_${rfc.toUpperCase()}.json`;
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    
    // Enviar el archivo JSON
    res.json(declaration);
    
  } catch (error) {
    console.error('Error al descargar declaración:', error);
    res.status(500).send('Error interno del servidor');
  }
});

module.exports = router;
