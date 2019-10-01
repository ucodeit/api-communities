let replier = 
{
    toJson: async function(res, header, data = null)
    {
        if(devMode === false)
        {
            delete header.devresponse;
        }

        if(data === null)
        {
            response = 
            { 
                _header: header
            };
        }
        else
        {
            response = data;
            response._header = header;
        }
            res.json(response);
            res.end();
    },
    ok: function(res, data = null)
    {
        this.toJson(res, { responseCode: 0, response: "ok", devresponse: ""}, data);
    },
    error: function(res, err)
    {
        this.toJson(res, err);
    },
    error404: function(res)
    {
        this.toJson(res, { responseCode: 404, response: "El API que usted marcó no se encuentra dentro del área de servicio", devresponse: "" });
    },
    getErrorHeader: function(responseCode, response, errorData, previousData = null)
    {
        let header = {};
        if(previousData === null) // Si no se han recibido datos previos se procede a crear el header con la información del error.
        {
            header =
            {
                responseCode: responseCode,
                response: response,
                stackTrace:
                [{
                responseCode: responseCode,
                response: response,
                errorData: errorData,
                }]
            }
        }
        else // Si se han recibido datos previos se procede a agregar la información del paso actual al error original
        {
            if(previousData.hasOwnProperty("_header"))
            {
                header = Object.assign({}, previousData._header);
            }
            else
            {
                header = Object.assign({}, previousData);
            }

            if(!header.hasOwnProperty("responseCode") || header.responseCode === null)
            {
                header.responseCode = responseCode;
            }
            if(!header.hasOwnProperty("response") || header.response === null)
            {
                header.response = response;
            }
            if(!header.hasOwnProperty("stackTrace") || header.stackTrace === null)
            {
                header.stackTrace = [];
            }

            header.stackTrace.push({
                responseCode: responseCode,
                response: response,
                errorData: errorData,
            });
        }
        return header;
    },

    getParametersErrorHeader: function(nodeCode, errorData)
    {
        return this.getErrorHeader(nodeCode + "01", "Existe un problema con los parámetros recibidos", errorData);
    },
    
    getDBErrorHeader: function(nodeCode, errorData)
    {
        return this.getErrorHeader(nodeCode + "02", "Ocurrió un error al comunicarse con la base de datos", errorData);
    },


    errorParameters: function(error)
    {
        return { responsecode: error.errCode, response: "Revise que el contenido del cuerpo de la petición sea correcto.", devresponse : error.err}; 
    },

    errordb: function(error)
    {
        return { responsecode: 909, response: "Hubo un error en la solicitud, por favor inténtelo nuevamente", devresponse : error};
    },

    errorUnknownUser: function(error)
    {
        return { responsecode: 56800, response: "El usuario o contraseña son incorrectos", devresponse: error};
    }
}

module.exports = replier;