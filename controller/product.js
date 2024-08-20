const sequelize = require('../config/db');
const Product = require('../model/product'); // Your Product model

const getAllProducts = async (req, reply) => {
    try {
        const products = await Product.findAll();
        reply.status(200).send(products);
    } catch (err) {
        reply.status(500).send(err);
    }
};

const getProductById = async (req, reply) => {
    const id = req.params.id;
    try {
        const product = await Product.findByPk(id);
        if (product) {
            reply.status(200).send(product);
        } else {
            reply.status(404).send({ message: 'Product not found' });
        }
    } catch (err) {
        reply.status(500).send(err);
    }
};

const addProduct = async (req, reply) => {
    const { name, price, quantity, color } = req.body;
    try {
        const newProduct = await Product.create({ name, price, quantity, color });
        reply.status(201).send({ message: 'Product added successfully', product: newProduct });
    } catch (err) {
        reply.status(400).send(err);
    }
};

const updateProduct = async (req, reply) => {
    const { id } = req.params; // Get the id from the request parameters
    const { name, price, quantity, color } = req.body;
    try {
        const result = await Product.update(
            { name, price, quantity, color },
            { where: { id } }
        );
        if (result[0]) { // result[0] gives the number of affected rows
            reply.status(200).send({ message: 'Product updated successfully' });
        } else {
            reply.status(404).send({ message: 'Product not found' });
        }
    } catch (err) {
        reply.status(400).send(err);
    }
};

const deleteProductById = async (req, reply) => {
    const id = req.params.id;
    try {
        const result = await Product.destroy({ where: { id } });
        if (result) {
            reply.status(200).send({ message: 'Product deleted successfully' });
        } else {
            reply.status(404).send({ message: 'Product not found' });
        }
    } catch (err) {
        reply.status(500).send(err);
    }
};


module.exports = {
    getAllProducts,
    getProductById,
    addProduct,
    updateProduct,
    deleteProductById,
};
