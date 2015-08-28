Ext.define('Spm.store.Agents', {
    extend: 'Ext.data.Store',
    alias: 'store.agents',

    requires: [
        'Spm.model.Agent'
    ],
    model: 'Spm.model.Agent',
    groupField: 'teamName'

});