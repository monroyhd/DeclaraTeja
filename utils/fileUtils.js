const fs = require('fs-extra');
const path = require('path');

/**
 * Crea un directorio único para el usuario
 * @param {string} rfc - RFC del usuario
 * @returns {string} - Ruta del directorio creado
 */
const createUserDirectory = async (rfc) => {
  const userDir = path.join(__dirname, '..', 'data', 'declarations', rfc.toUpperCase());
  await fs.ensureDir(userDir);
  return userDir;
};

/**
 * Guarda la declaración en formato JSON
 * @param {string} rfc - RFC del usuario
 * @param {number} year - Año de la declaración
 * @param {Object} declarationData - Datos de la declaración
 * @returns {string} - Ruta del archivo generado
 */
const saveDeclaration = async (rfc, year, declarationData) => {
  const userDir = await createUserDirectory(rfc);
  const filename = `${year}_${rfc.toUpperCase()}.json`;
  const filePath = path.join(userDir, filename);
  
  const declaration = {
    rfc: rfc.toUpperCase(),
    year: year,
    fechaCaptura: new Date().toISOString(),
    datos: declarationData
  };
  
  await fs.writeJson(filePath, declaration, { spaces: 2 });
  return filePath;
};

/**
 * Obtiene las declaraciones de un usuario
 * @param {string} rfc - RFC del usuario
 * @returns {Array} - Array de declaraciones
 */
const getUserDeclarations = async (rfc) => {
  const userDir = path.join(__dirname, '..', 'data', 'declarations', rfc.toUpperCase());
  
  if (!(await fs.pathExists(userDir))) {
    return [];
  }
  
  const files = await fs.readdir(userDir);
  const declarations = [];
  
  for (const file of files) {
    if (file.endsWith('.json')) {
      const filePath = path.join(userDir, file);
      const declaration = await fs.readJson(filePath);
      declarations.push(declaration);
    }
  }
  
  return declarations.sort((a, b) => b.year - a.year);
};

/**
 * Valida RFC mexicano
 * @param {string} rfc - RFC a validar
 * @returns {boolean} - true si es válido
 */
const validateRFC = (rfc) => {
  const rfcRegex = /^[A-Z&Ñ]{3,4}[0-9]{6}[A-Z0-9]{3}$/;
  return rfcRegex.test(rfc.toUpperCase());
};

module.exports = {
  createUserDirectory,
  saveDeclaration,
  getUserDeclarations,
  validateRFC
};
