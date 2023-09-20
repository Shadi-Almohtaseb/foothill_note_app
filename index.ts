import app from "./app.js";
import { initDB } from "./db/dataSource.js";
const PORT = process.env.PORT || 5000;


app.listen(PORT, async () => {
    console.log(`App is listening on port ${PORT} and host http://localhost:${PORT}`);
    await initDB()
});