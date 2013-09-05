Ext.define('Spm.store.EventHistory', {
    extend: 'Ext.data.Store',
    alias: 'store.eventHistory',
    model: 'Spm.model.EventHistory',
    filterOnLoad: false,

    requires: [
        'Spm.model.EventHistory'
    ],

    proxy: {
        type: 'ajax',
        url: 'api/serviceproblem/eventhistory',
        reader: {
            type: 'json'
        }
    }
});