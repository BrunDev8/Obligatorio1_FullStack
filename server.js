import app from "./app.js";
import connectDB from "./v1/config/db.config.js";

const PORT = process.env.PORT || 3000;

const start = async () => {
    await connectDB();
    app.listen(PORT, () => {
        console.log(`http://localhost:${PORT}`);
    });
};

start();