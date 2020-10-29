import { Schema, model } from 'mongoose';           // Import Schema and model from mongoose for create in the db

const productSchema = new Schema({                  // Save the Schema in a const to call in other place in the code
    name : String,
    category : String,
    price : Number,
    imgURL : String
}, {
    timestamps : true,                              // Timestamp create two fields (created_at and updated_at)
    versionKey : false,
});

export default model('Product', productSchema);     // Export model for get two data to create a Product