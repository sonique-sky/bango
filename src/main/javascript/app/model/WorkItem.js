Ext.define('Spm.model.WorkItem', {
    extend: 'Ext.data.Model',
    alias: 'model.workItem',

    fields: [
        {
            name: 'workItemId'
        },
        {
            name: 'status'
        }
    ],

    isHeld: function() {
        return 'Held' == this.get('status');
    },

    hasOne: [
        'agent', {model: 'Spm.model.Agent', name: 'agent', associationKey: 'agent', getterName: 'agent'}
    ]
});