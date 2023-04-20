const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.CLIENT_ID);

/**
 * Función asincrónica que verifica el token de autenticación de Google.
 * @async
 * @function googleVerify
 * @param {string} token Token de autenticación generado por Google.
 * @returns {Object} Objeto con información de la cuenta de Google verificada.
 */
async function googleVerify(token = "") {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.CLIENT_ID,
  });

  const payload = ticket.getPayload();
  const { email, given_name, family_name } = payload;
  return { email: email, nombre: given_name, apellido: family_name };
}

module.exports = {
  googleVerify,
};
