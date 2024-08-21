const customerController = require('../controller/customer');
const { verifyJwtOrPublicRoute } = require('../server'); // Correctly import the function

async function routes(fastify) {
    fastify.get("/customers", { preHandler: verifyJwtOrPublicRoute },  customerController.getAllCustomers);
    fastify.get("/customers/:id", { preHandler: verifyJwtOrPublicRoute },  customerController.getCustomerById);
    fastify.delete("/customers/:id", { preHandler: verifyJwtOrPublicRoute },  customerController.deleteCustomerById);
    fastify.post("/customers",  { preHandler: verifyJwtOrPublicRoute }, customerController.addCustomers);
    fastify.put("/customers", { preHandler: verifyJwtOrPublicRoute },  customerController.updateCustomers);
}
    
module.exports = routes;
