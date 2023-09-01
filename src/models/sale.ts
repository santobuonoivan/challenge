import mongoose, { Schema } from 'mongoose'

const schema = new mongoose.Schema({
    client_name: {
        type: String,
        required: true,
    },
    price:{
        type: Number,
        required: true
    },
    products: [
        {
            amount: {
                type: Number,
                required: true
            },
            product: {
                type: Schema.Types.ObjectId,
                ref: 'Product',
                required: true,
            }
        }
    ]
})

export default mongoose.model('Sale', schema)