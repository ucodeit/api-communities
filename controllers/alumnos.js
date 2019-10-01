const model = require('../models/alumno');
const replier = require('../handlers/replier');
const verificator = require('../handlers/verificator');

const alumnos = 
{
    Registrar = async (req, res, next) =>
    {
        let body = req.body;

        const baseParametros = {
            nombre: { type:"string", minLenght:1 },
            boleta: { type:"number", minLenght:1 },
            correo: { type:'email', minLenght:1 },
            username: { type:'string', minLenght:1 },
            password: { type:'string', minLenght: 1 },
            carrera: { type:'number', minLenght:1 },
        }

        try
        {
            await verificator.Validate(baseParametros, body);
        }
        catch(e)
        {
            replier.error(replier.errorParameters(res, e));
            return;
        }

        try
        {
            await model.InsertStudent(body.nombre, body.correo, body.username, body.password, body.carrera, body.boleta);
            replier.ok(res);
            return;
        }
        catch(e)
        {
            replier.error(res, replier.errordb(e));
            return;
        }
    },

    Login : async (req, res, next) =>
    {
        let body = req.body;

        const baseParametros = {
            username: { type:'string', minLenght:1 },
            password: { type:'string', minLenght: 1 }
        }

        try
        {
            await verificator.Validate(baseParametros, body);
        }
        catch(e)
        {
            replier.error(res, replier.errorParameters(e));
            return;
        }

        try
        {
            let alumno = await model.Login(username, password);
            replier.ok(res, alumno);
            return;
        }
        catch(e)
        {
            replier.error(res, replier.errorParameters(e));
            return;
        }
    }
}

module.exports = alumnos;