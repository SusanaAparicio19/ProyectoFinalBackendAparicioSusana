import { loggerUtils } from '../utils/loggerUtils.js';

export const loggerTest = (req, res) => {
 
    loggerUtils.debug('Message debug');
    loggerUtils.http('Message http');
    loggerUtils.info('Message info');
    loggerUtils.warning('Message warning');
    loggerUtils.error('Message error');
    
  
    res.send('Informacion enviada. Ddetalle de Datos en  "errors.log".');
}