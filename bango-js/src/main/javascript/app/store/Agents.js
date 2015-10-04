Ext.define('Spm.store.Agents', {
    extend: 'Ext.data.Store',
    alias: 'store.agents',

    requires: [
        'Ext.data.proxy.Rest',
        'Spm.model.Agent'
    ],

    model: 'Spm.model.Agent',
    remoteSort: true,
    remoteFilter: true,

    sorters: 'code',

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
