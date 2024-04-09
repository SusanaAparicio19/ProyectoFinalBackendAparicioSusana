import dotenv from "dotenv";
dotenv.config()

//export const PRODUCTS_JASON = './db/products.json';
export const PORT = process.env.PORT;
//export const MONGODB_CNX_STR = 'mongodb://127.0.0.1/ecommerce'
export const MONGODB_CNX_STR = process.env.MONGODB_CNX_STR ?? 'mongodb://localhost/ecommerce'

export const SESSION_SECRET = process.env.SESSION_SECRET
export const JWT_PRIVATE_KEY = process.env.JWT_PRIVATE_KEY || 'jwtsecret'
export const COOKIE_SECRET = process.env.COOKIE_SECRET || 'cookiesecret'
export const USER_EMAIL = process.env. USER_EMAIL
export const USER_PASSWORD = process.env.USER_PASSWORD
export const NODE_ENV = process.env.NODE_ENV || 'development'
export const LOG_LEVEL = parseInt(process.env.LOG_LEVEL || '10' )


export const githubAppId = process.env.githubAppId
export const githubClienteId = process.env.githubClienteId
export const githubClientSecret = process.env.githubClientSecret
export const githubCallbackUrl = process.env.githubCallbackUrl
