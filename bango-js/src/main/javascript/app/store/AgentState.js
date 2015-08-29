Ext.define('Spm.store.AgentState', {
    extend: 'Ext.data.Store',
    alias: 'store.agentState',

    requires: [
        'Spm.model.AgentState'
    ],

    proxy: {
        type: 'ajax',
        url: 'api/agent/agentState',
        reader: {
            type: 'json'
        }
    }
});