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
