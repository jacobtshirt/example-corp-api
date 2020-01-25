const agentStore = require('../store/agent');
const customerStore = require('../store/customer');
/**
 * Handle requests to the Agent API
 */
function handleGetAllAgents(request, reply) {
    try {
        const agents = agentStore.getAllAgents();
        reply.send({ agents });
    } catch (error) {
        reply.code(500).send(error);
    }
}

function handleGetAgentById(request, reply) {
    try {
        const { id } = request.params;
        const agent = agentStore.getAgentById(id);
        if (agent) {
            reply.send({ agent });
        } else {
            reply.code(404).send();
        }
    } catch (error) {
        reply.code(500).send(error);
    }
}

function handleGetCustomersByAgentId(request, reply) {
    try {
        const { id } = request.params;
        const customers = customerStore.getAllCustomersForAgentId(id);
        if (customers && customers.length) {
            reply.send({ customers });
        } else {
            reply.code(404).send();
        }
    } catch (error) {
        reply.code(500).send(error);
    }
}

function handleUpdateAgent(request, reply) {
    try {
        const agentToBeUpdated = request.body;
        agentStore.updateAgent(agentToBeUpdated);
        reply.code(200).send();
    } catch (error) {
        reply.code(500).send(error);
    }
}
 
function handleAddAgent(request, reply) {
    try {
        const agentToBeAdded = request.body;
        const newAgentId = agentStore.addAgent(agentToBeAdded);
        reply.code(201).send({ agentId: newAgentId });
    } catch (error) {
        reply.code(500).send(error);
    }
}

module.exports = function (fastify, opts, done) {
    fastify.get('/', handleGetAllAgents);
    fastify.put('/', handleUpdateAgent);
    fastify.post('/', handleAddAgent);
    fastify.get('/:id', handleGetAgentById);
    fastify.get('/:id/customer', handleGetCustomersByAgentId);
    done()
}
