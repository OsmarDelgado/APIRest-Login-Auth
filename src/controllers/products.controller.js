import Product from '../models/Product'

export const createProducts = async (req, res) => {
    const { name, category, price, imgURL } = req.body;                     // Destructuring for save data in constants
    const newProduct = new Product({ name, category, price, imgURL });      // Create new Product and is saved in a constant
    const productSaved = await newProduct.save();                           // Save constat of product in DB
    res.status(201).json(productSaved);                                     // Return status 201 (created item succesful) and show in json the item
}

export const getProducts = async (req, res) => {
    const products = await Product.find();                                  // Get all products
    res.send(products);                                                     // Show all products in json format
}

export const getProductById = async (req, res) => {
    const product = await Product.findById(req.params.productId);           // Save in a constant the product get from the ID
    res.status(200).json(product);                                          // Show in json format the product
}

export const updateProductById = async (req, res) => {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.productId, req.body, { new : true });         // Save in a constant the product get from the ID and send to show the updated product
    res.status(200).json(updatedProduct);                                                                           // Send with status 200 the updated product in json format
}

export const deleteProductById = async (req, res) => {
    // const deletedProduct = await Product.findByIdAndDelete(req.params.productId);                                // Save the deleted product in a constant get by ID
    // res.status(200).json(deletedProduct);                                                                        // Show in json format the deleted product

    await Product.findByIdAndDelete(req.params.productId);                                                          // Get by ID and delete the product
    res.status(204).json();                                                                                         // Return status 204 from the server
}