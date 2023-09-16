import { DataSource } from "typeorm";
import { Note } from "./entities/Note.js";

const dataSource = new DataSource({
    type: 'mysql',
    host: process.env.MYSQL_ADDON_HOST,
    port: Number(process.env.MYSQL_ADDON_PORT),
    username: process.env.MYSQL_ADDON_USER,
    password: process.env.MYSQL_ADDON_PASSWORD,
    database: process.env.MYSQL_ADDON_DB,
    url: process.env.MYSQL_ADDON_URI,
    entities: [
        Note
    ],
    migrations: ['./**/migration/*.ts'],
    synchronize: true,
    logging: false
})

export default dataSource;