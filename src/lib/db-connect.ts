import mongoose from "mongoose";

type ConnectionObject = {
    isConnected?: boolean;
}

const connection: ConnectionObject = {};

async function dbConnect(): Promise<void> {
    if(connection.isConnected) {
        console.log("Already connected to database");
        return;
    }
    try {
        const db = await mongoose.connect(process.env.DATABASE_URL || "", {

        });
        connection.isConnected = db.connections[0].readyState === 1;
        console.log("Connected to database");
    } catch (error) {
        console.log("Error connecting to database");
        process.exit(1);
    }
}

export default dbConnect; 