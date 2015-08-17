Ext.define('Spm.store.EventHistoryItemType', {
    extend: 'Ext.data.Store',
    alias: 'store.eventHistoryItemType',
    model: 'Spm.model.EventHistoryItemType',
    filterOnLoad: false,
    autoLoad: false,
    requires: [
        'Spm.model.EventHistoryItemType'
    ]

});