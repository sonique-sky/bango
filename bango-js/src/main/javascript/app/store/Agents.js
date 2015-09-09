Ext.define('Spm.store.Agents', {
    extend: 'Ext.data.Store',
    alias: 'store.agents',

    requires: [
        'Spm.model.Agent'
    ],

    model: 'Spm.model.Agent',

    proxy: {
        type: 'rest',
        appendId: false,
        url: 'api/agent',
        reader: {
            type: 'json',
            rootProperty: 'data'
        },
        writer: {
            type: 'json',
            writeAllFields: true
        }
    }
});
