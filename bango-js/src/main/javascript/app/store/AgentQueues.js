Ext.define('Spm.store.AgentQueues', {
    extend: 'Ext.data.Store',
    alias: 'store.agentQueues',

    requires: [
        'Spm.model.Queue'
    ],

    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            model: 'Spm.model.Queue',
            sortOnLoad: false,
            proxy: {
                type: 'memory',
                reader: {
                    type: 'json',
                    root: 'team.assignedQueues'
                }
            }
        }, cfg)]);
    }
});