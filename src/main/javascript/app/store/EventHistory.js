Ext.define('Spm.store.EventHistory', {
    extend: 'Ext.data.Store',
    alias: 'store.eventHistory',
    model: 'Spm.model.EventHistoryItem',
    filterOnLoad: false,

    requires: [
        'Spm.model.EventHistoryItem'
    ],

    proxy: {
        type: 'ajax',
        url: 'api/serviceproblem/eventhistory',
        reader: {
            type: 'json'
        }
    }
});