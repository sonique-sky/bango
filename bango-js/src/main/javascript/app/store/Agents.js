Ext.define('Spm.store.Teams', {
    extend: 'Ext.data.Store',
    alias: 'store.agents',

    requires: [
        'Spm.model.Agent'
    ],
    model: 'Spm.model.Agent'
});