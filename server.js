/**
 * Assumptions:
 * 1. All requests are valid
 * 
 * Questions for Product Owner:
 * 1. Does the API need to be secured?
 * 2. Who is the intended user this API?
 * 3. Does this API need to meet a performance metric?
 */

const fastify = require('fastify')({
    logger: true
});

const agentsApi = require('./api/agent');
const customersApi = require('./api/customer');

fastify.register(agentsApi, { prefix: '/agent' });
fastify.register(customersApi, { prefix: '/customer' });

fastify.listen(3003, (err, address) => {
    if (err) {
        fastify.log.error(err)
        process.exit(1)
    }
});


process.on('error', (error) => {
    console.log('Unhandled Exception Occurred');
    console.error(error);
});
