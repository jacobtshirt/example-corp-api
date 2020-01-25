const lowDb = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('./store/customers.json');
const db = lowDb(adapter);

/**
 * @class CustomerStore
 * Handles customer data operations
 */
class CustomerStore {

    constructor(db) {
        this.db = db;
    }

    get customers() {
        return this.db.get('customers');
    }

    getAllCustomers() {
        return this.customers
            .value();
    }

    getCustomerById(id) {
        return this.customers
            .find({ _id: Number(id) })
            .value();
    }

    getAllCustomersForAgentId(agentId) {
        return this.customers
            .filter({ agent_id: Number(agentId) })
            .value();
    }

    addCustomer(customer) {
        const newCustomerId = Math.random(); // assume using real IDs outside of mock env
        this.customers
            .push({ 
                _id: newCustomerId,
                ...customer 
            })
            .write();
        return newCustomerId;
    }

    async updateCustomer(customer) {
        this.customers
            .find({ _id: customer._id })
            .assign({ ...customer })
            .write();
    }

    removeCustomer(id) {
        this.customers
            .remove({ _id: id })
            .write();
    }
}

module.exports = new CustomerStore(db);
