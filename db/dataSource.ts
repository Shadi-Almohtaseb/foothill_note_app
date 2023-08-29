import { DataSource } from "typeorm";
import { Note } from "./entities/Note.js";

const dataSource = new DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'note-app',
    entities: [
        Note
    ],
    migrations: ['./**/migration/*.ts'],
    synchronize: true,
    logging: true
})

export default dataSource;