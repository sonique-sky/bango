Ext.define('Spm.model.AgentState', {
    extend: 'Ext.data.Model',
    alias: 'model.agentState',

    fields: [
        {
            name: 'activeCount'
        },
        {
            name: 'heldCount'
        },
        {
            name: 'availability'
        },
        {
            convert: function (v, rec) {
                return rec.get('availability') == 'Available';
            },
            name: 'isAvailable'
        }
    ]
});