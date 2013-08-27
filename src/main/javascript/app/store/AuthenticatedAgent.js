 Ext.define('Spm.store.AuthenticatedAgent', {
    extend: 'Ext.data.Store',
    alias: 'store.authenticatedAgent',

    requires: [
        'Spm.model.Agent'
    ],

    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            autoLoad: false,
            filterOnLoad: false,
            model: 'Spm.model.Agent',
            sortOnLoad: false,
            proxy: {
                type: 'ajax',
                url: 'api/agent/authenticatedAgent',
                reader: {
                    type: 'json'
                }
            },
            listeners: {
                load: {
                    fn: me.onAuthenticatedAgentLoaded,
                    scope: me
                }
            }
        }, cfg)]);
    },

    onAuthenticatedAgentLoaded: function (store, records, successful, eOpts) {
        var queueStore = Ext.data.StoreManager.lookup('AgentQueues');

        queueStore.loadRawData(store.proxy.reader.jsonData);
    }

});