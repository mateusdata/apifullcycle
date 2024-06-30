import env from "env-var"

export const envConfig = {
    PORT: env.get("PORT").required().asInt(),
    DATABASE_URL: env.get("DATABASE_URL").required().asUrlString(),
    PROJECT_NAME: env.get("PROJECT_NAME").required().asString(),
    HOST: env.get("HOST").required().asString() 
}