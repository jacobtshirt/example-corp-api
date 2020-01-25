const customerStore = require('../store/customer');
/**
 * Handle requests to the Customer API
 */
function handleGetAllCustomers(request, reply) {
    try {
        const customers = customerStore.getAllCustomers();
        reply.send({ customers });
    } catch (error) {
        reply.code(500).send(error);
    }
}

function handleGetCustomerById(request, reply) {
    try {
        const { id } = request.params;
        const customer = customerStore.getCustomerById(id);
        if (customer) {
            reply.send({ customer });
        } else {
            reply.code(404).send();
        }
    } catch (error) {
        reply.code(500).send(error);
    }
}

function handleAddCustomer(request, reply) {
    try {
        const customerToBeAdded = request.body;
        const newCustomerId = customerStore.addCustomer(customerToBeAdded);
        reply.code(201).send({ customerId: newCustomerId });
    } catch (error) {
        reply.code(500).send(error);
    }
}

function handleUpdateCustomer(request, reply) {
    try {
        const customerToBeUpdated = request.body;
        customerStore.updateCustomer(customerToBeUpdated);
        reply.send();
    } catch (error) {
        reply.code(500).send(error);
    }
}

function handleDeleteCustomer(request, reply) {
    try {
        const { id } = request.params;
        customerStore.removeCustomer(id);
        reply.code(202).send();
    } catch (error) {
        reply.code(500).send(error);
    }
}

module.exports = function (fastify, opts, done) {
    fastify.get('/', handleGetAllCustomers);
    fastify.put('/', handleUpdateCustomer);
    fastify.post('/', handleAddCustomer);
    fastify.get('/:id', handleGetCustomerById);
    fastify.delete('/:id', handleDeleteCustomer);
    done();
}
