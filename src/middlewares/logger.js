

import { loggerUtils } from '../utils/loggerUtils.js';

export const loggerInRequest = (req, res, next) => {
    req.logger = loggerUtils; 
    req.logger.log('info', `${req.method} en ${req.url} - ${new Date().toLocaleTimeString()}`);
    next();
};

