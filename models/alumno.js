const sql = require('../config/db');

let model = 
{
    InsertStudent : (nombre, correo, username, password, carrera, boleta) =>
    {
        return new Promise((resolve, reject)=>
        {
            let query = ""+
            "INSERT INTO alumno (nombre, boleta, correo, username, password, carrera) "+
            "VALUES ('" + nombre + "', " + boleta + ", '" + correo + "', '" + username + "', '" + password + "', " + carrera + ")";

            try
            {
                let data = await sql.querySingleRow(query);
                if(!data || data === undefined)
                {
                    data = false;
                }
                resolve(data);
            }
            catch(e)
            {
                reject(e);
            }
        }); 
    },

    Login : (username, password) =>
    {
        return new Promise((resolve, reject)=>
        {
            let query = "" +
            "SELECT idAlumno " +
            "FROM alumno " +
            "WHERE username = '" + username + "' " +
                "AND password = '" + password +"'";

            try
            {
                let data = await sql.querySingleRow(query);
                if(!data || data === undefined)
                {
                    data = false;
                }
                resolve(data);
            }
            catch(e)
            {
                reject(e);
            }
        });
    }
}

module.exports = model;