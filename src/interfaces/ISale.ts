import { Document, Schema } from 'mongoose';

export interface ISale extends Document {
    client_name: string;
    price: number;
    products: Array<{
        amount: number;
        price: number;
        product: Schema.Types.ObjectId;
    }>;
}
