Ext.define('Spm.store.AuthenticatedAgent', {
    extend: 'Ext.data.Store',
    alias: 'store.authenticatedAgent',

    requires: [
        'Spm.model.Agent'
    ],

    storeId: 'authenticatedAgentFoo',
    autoLoad: false,
    filterOnLoad: false,
    model: 'Spm.model.Agent',
    sortOnLoad: false,
    proxy: {
        type: 'ajax',
        url: 'api/agent/authenticatedAgent',
        reader: {
            type: 'json'
        }
    },

    authenticatedAgent: function () {
        return this.first();
    }
});