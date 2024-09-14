import {config as conf} from "dotenv";
conf();

const _config = {
    port: process.env.PORT,
    dataBaseUrl: process.env.MONGOOSE_CONNECTION_STRING,
    env: process.env.NODE_ENV,
    jwtSecret: process.env.JWT_SECRET,
};

export const config = Object.freeze(_config);