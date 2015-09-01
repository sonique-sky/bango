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
        }
    ],

    isAvailable: function() {
        return this.get('availability') == 'Available';
    }
});