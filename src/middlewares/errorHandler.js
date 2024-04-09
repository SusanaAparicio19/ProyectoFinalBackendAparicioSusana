const errorHandlers = {
  error: (res, statusCode, errorCode) => {
    let message;
    switch (statusCode) {
      case 400:
        message = 'Error En La Solicitud';
        break;
      case 401:
        message = 'No Autorizado';
        break;
      case 403:
        message = 'Acceso Denegado';
        break;
      case 404:
        message = 'No Encontrado';
        break;
      case 422:
        message = 'La solicitud contiene Informacion Incorrecta';
        break;
      default:
        message = errorCode ? `Error ${errorCode}` : 'Error Interno Del Servidor';
    }
    res.status(statusCode).json({
      status: 'error',
      message: message
    });
  }
};

export default errorHandlers


//--------------para recordar como llamarlos------------
/*
errorHandlers.error(res, 400, 'BadRequest');
errorHandlers.error(res, 401, 'Unauthorized');
errorHandlers.error(res, 403, 'Forbidden');
errorHandlers.error(res, 404, 'NotFound');
errorHandlers.error(res, 422, 'UnprocessableEntity');
*/

