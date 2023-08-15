import mongoose from "mongoose";

mongoose.connect('mongodb+srv://<cluster>:<password>@cluster0.f5onqih.mongodb.net/<database>')

export default mongoose.connection
