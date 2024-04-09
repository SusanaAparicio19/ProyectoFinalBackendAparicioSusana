import { LOG_LEVEL } from '../config.js';
import fs from 'fs/promises'
import { NODE_ENV } from '../config.js';
import winston from 'winston'

class Logger{
  constructor(entorno, nivelDeImportancia) {
    this.entorno = entorno
    this. nivelDeImportancia = nivelDeImportancia
  }

  log(nivel, mensaje) {
    if(nivel <=this.nivelDeImportancia) {
      const lineaRegistro = `${new Date().toLocaleString()}: ${mensaje}` + '\n'
      if(this.entorno ==='development'){
        console.log(lineaRegistro)
      }else{
        fs.appendFile('eventos.log', lineaRegistro)
      }
    }
  }
}

export const logger = new Logger(NODE_ENV, LOG_LEVEL)


const customLevelsOptions = {

    levels: {
      debug: 0,
      http: 1,
      info: 2,
      warning: 3,
      error: 4,
      
    },
    colors: {
        debug: 'white',
        http: 'violet',
        info: 'blue',
        warning: 'yellow',
        error: 'red',
        
    }
}

const winstonLoggerDev = winston.createLogger({
  
  //levels: customLevelsOptions.levels,
  transports: [
    new winston.transports.Console({
      level: "debug",
    })
  ]
})

const winstonLoggerProd = winston.createLogger({
  
  //levels: customLevelsOptions.levels,
  transports: [
    new winston.transports.Console({
      level: "info",
    }),
    new winston.transports.File({
      level: "error",
      filename: 'errors.log'
    })
  ]
})

function getLogger() {
if (process.env.NODE_ENV === 'production') {
  return winstonLoggerProd
} else {
  return winstonLoggerDev
}
}
export const loggerUtils = getLogger();