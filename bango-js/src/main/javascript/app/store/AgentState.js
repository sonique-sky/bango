 Ext.define('Spm.store.AgentState', {
    extend: 'Ext.data.Store',
    alias: 'store.agentState',

    requires: [
        'Spm.model.AgentState'
    ],

    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            autoLoad: false,
            filterOnLoad: false,
            model: 'Spm.model.AgentState',
            sortOnLoad: false,
            proxy: {
                type: 'ajax',
                url: 'api/agent/agentState',
                reader: {
                    type: 'json'
                }
            }
        }, cfg)]);
    }
});