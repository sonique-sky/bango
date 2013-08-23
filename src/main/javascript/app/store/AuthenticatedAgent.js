Ext.define('Spm.store.AuthenticatedAgent', {
    extend: 'Ext.data.Store',
    alias: 'store.authenticatedAgent',

    requires: [
        'Spm.proxy.SpmAjaxProxy',
        'Spm.model.Agent'
    ],

    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply(me.processAuthenticatedAgent({
            autoLoad: false,
            filterOnLoad: false,
            model: 'Spm.model.Agent',
            sortOnLoad: false,
            storeId: 'authenticatedAgent',
            listeners: {
                load: {
                    fn: me.onAuthenticatedAgentLoaded,
                    scope: me
                }
            }
        }), cfg)]);
    },

    processAuthenticatedAgent: function (config) {
        return Ext.applyIf(config, {
            proxy: {
                type: 'spmAjaxProxy',
                url: 'api/agent/authenticatedAgent',
                reader: {
                    type: 'json',
                    root: 'agent'
                }
            }
        });
    },

    onAuthenticatedAgentLoaded: function (store, records, successful, eOpts) {
        var queueStore = Ext.data.StoreManager.lookup('QueueStore');

        queueStore.loadRawData(store.proxy.reader.jsonData);
    }

});