Ext.define('Spm.store.AuthenticatedAgent', {
    extend: 'Ext.data.Store',
    alias: 'store.authenticatedAgent',

    requires: [
        'Spm.model.Agent'
    ],

    model: 'Spm.model.Agent',

    proxy: {
        type: 'ajax',
        url: 'api/agent/authenticatedAgent',
        reader: {
            type: 'json'
        }
    }
});
