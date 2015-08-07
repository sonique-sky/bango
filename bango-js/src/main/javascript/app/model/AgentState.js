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
            name: 'isAvailable',
            convert: function (v, rec) {
                return rec.get('availability') == 'Available';
            }
        }
    ]
});