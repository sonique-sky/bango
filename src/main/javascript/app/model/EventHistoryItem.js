Ext.define('Spm.model.EventHistoryItem', {
    extend: 'Ext.data.Model',
    alias: 'model.eventHistoryItem',

    fields: [
        {
            name: 'eventType'
        },
        {
            name: 'note'
        },
        {
            name: 'createdDate',
            type: 'date',
            dateFormat: 'd/m/Y H:i'

        },
        {
            name: 'createdBy'
        }
    ]
});