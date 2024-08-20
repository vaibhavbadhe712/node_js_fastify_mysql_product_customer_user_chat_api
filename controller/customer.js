const Customer = require('../model/model');

const getAllCustomers = async (req, reply) => {
    try {
        const customers = await Customer.findAll();
        reply.status(200).send(customers);
    } catch (err) {
        reply.status(500).send(err);
    }   
};

const getCustomerById = async (req, reply) => {
    const id = req.params.id;
    try {
        const customer = await Customer.findByPk(id);
        if (customer) {
            reply.status(200).send(customer);
        } else {
            reply.status(404).send({ message: 'Customer not found' });
        }
    } catch (err) {
        reply.status(500).send(err);
    }
};

const deleteCustomerById = async (req, reply) => {
    const id = req.params.id;
    try {
        const result = await Customer.destroy({ where: { id } });
        if (result) {
            reply.status(200).send({ message: 'Customer deleted successfully' });
        } else {
            reply.status(404).send({ message: 'Customer not found' });
        }
    } catch (err) {
        reply.status(500).send(err);
    }
};

const addCustomers = async (req, reply) => {
    const { name, email, phone, address } = req.body;
    try {
        const newCustomer = await Customer.create({ name, email, phone, address });
        reply.status(201).send({ message: 'Customer added successfully', customer: newCustomer });
    } catch (err) {
        reply.status(400).send(err);
    }
};

const updateCustomers = async (req, reply) => {
    const { id, name, email, phone, address } = req.body;
    try {
        const result = await Customer.update(
            { name, email, phone, address },
            { where: { id } }
        );
        if (result[0]) {
            reply.status(200).send({ message: 'Customer updated successfully' });
        } else {
            reply.status(404).send({ message: 'Customer not found' });
        }
    } catch (err) {
        reply.status(400).send(err);
    }
};

module.exports = {
    getAllCustomers,
    getCustomerById,
    deleteCustomerById,
    addCustomers,
    updateCustomers,
};
