const customerController = require('../controller/customer');

async function routes(fastify) {
    fastify.get("/customers", customerController.getAllCustomers);
    fastify.get("/customers/:id", customerController.getCustomerById);
    fastify.delete("/customers/:id", customerController.deleteCustomerById);
    fastify.post("/customers", customerController.addCustomers);
    fastify.put("/customers", customerController.updateCustomers);
}

module.exports = routes;
