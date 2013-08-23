Ext.define('Spm.store.QueueStore', {
    extend: 'Ext.data.Store',
    alias: 'store.queueStore',

    requires: [
        'Spm.model.Queue'
    ],

    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            model: 'Spm.model.Queue',
            sortOnLoad: false,
            storeId: 'queueStore',
            proxy: {
                type: 'memory',
                reader: {
                    type: 'json',
                    root: 'agent.queues'
                }
            }
        }, cfg)]);
    }
});