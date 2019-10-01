//Dependencias
const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const replier = require('./handlers/replier');
const rutasAlumno = require('./routes/alumnos');
const port = process.env.PORT || 9001;

//Inicializando dependencias
app.use(bodyParser.text());
app.use(morgan('dev'));
//Ejecución de ruta

app.use('/alumno', rutasAlumno);

app.use((req, res, next)=>
{
    replier.error404(res);
    next();
});

app.use((error, req, res, next)=>
{
    res.status(error.status || 500);
    res.json(
    {
        error:
        {
            message: error.message
        }
    });
});

app.listen(port, ()=> console.log(`API-Communities listening on port  ${port}`));
