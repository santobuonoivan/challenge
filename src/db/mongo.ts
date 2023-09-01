import mongoose, { ConnectOptions } from "mongoose";

const MONGODB_URI: string = process.env.MONGODB_URI || '';

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
} as ConnectOptions)
.then(() => {
    console.log('Conexión a MongoDB establecida con éxito');
})
.catch((error) => {
    console.error('Error al conectar a MongoDB:', error.message);
});