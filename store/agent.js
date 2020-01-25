const lowDb = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('./store/agents.json');
const db = lowDb(adapter);

/**
 * @class AgentStore
 * Handles agent data operations
 */
class AgentStore {
    
    constructor() {
        this.db = db;
    }

    get agents() {
        return db.get('agents');
    }

    getAllAgents() {
        return this.agents
            .value();
    }

    getAgentById(id) {
        return this.agents
            .find({ _id: Number(id) })
            .value();
    }

    addAgent(agent) {
        const newAgentId = Math.random();  // assume using real IDs outside of mock env
        this.agents
            .push(
                { 
                _id: newAgentId,
                ...agent 
            })
            .write();
        return newAgentId;
    }

    updateAgent(agent) {
        this.agents
            .find({ _id: agent._id })
            .assign({ ...agent })
            .write();
    }

}

module.exports = new AgentStore(db);
