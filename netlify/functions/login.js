const mysql = require("mysql2");

exports.handler = async (event, context) => {
  const { username, password } = JSON.parse(event.body); // Capturamos los datos del login

  const connection = mysql.createConnection({
    host: 'sql104.infinityfree.com', // Dirección de tu servidor MySQL
    user: 'if0_38330506', // Usuario de tu base de datos
    password: 'tu-contraseña', // Contraseña de tu base de datos
    database: 'jwB4PWvQPA89fOl' // Nombre de tu base de datos
  });

  return new Promise((resolve, reject) => {
    // Realizamos la consulta SQL para validar el usuario
    connection.query(
      'SELECT * FROM Login WHERE Usuario = ? AND Password = ?',
      [username, password],
      (err, results) => {
        if (err) {
          reject({
            statusCode: 500,
            body: JSON.stringify({ status: 'error', message: 'Error en la base de datos' }),
          });
        } else {
          if (results.length > 0) {
            resolve({
              statusCode: 200,
              body: JSON.stringify({ status: 'success', message: 'Login exitoso' }),
            });
          } else {
            resolve({
              statusCode: 401,
              body: JSON.stringify({ status: 'error', message: 'Usuario o contraseña incorrectos' }),
            });
          }
        }
        connection.end(); // Cerrar la conexión
      }
    );
  });
};
