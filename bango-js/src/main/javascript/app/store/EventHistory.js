Ext.define('Spm.store.EventHistory', {
    extend: 'Ext.data.Store',
    alias: 'store.eventHistory',
    model: 'Spm.model.EventHistoryItem',
    filterOnLoad: false,
    autoLoad: false,
    requires: [
        'Spm.model.EventHistoryItem'
    ],

    proxy: {
        type: 'serviceProblemEventHistoryProxy',
        reader: {
            type: 'json'
        }
    }
});