Ext.define('Spm.model.EventHistory', {
    extend: 'Ext.data.Model',
    alias: 'model.eventHistory',

    fields: [
        {
            name: 'eventType'
        },
        {
            name: 'note'
        },
        {
            name: 'createdDate'
        },
        {
            name: 'createdBy'
        }
    ]
});