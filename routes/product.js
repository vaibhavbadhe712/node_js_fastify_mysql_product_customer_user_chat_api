const productController = require('../controller/product');
const { verifyJwtOrPublicRoute } = require('../server'); // Correctly import the function

async function productRoutes(fastify) {
    fastify.get("/products", productController.getAllProducts);
    fastify.get("/products/:id", productController.getProductById);
    fastify.post("/products", productController.addProduct);
    fastify.put('/products/:id', productController.updateProduct); 
    fastify.delete("/products/:id", productController.deleteProductById);
}

module.exports = productRoutes;
