/*
 * File: app/store/AuthenticatedAgent.js
 *
 * This file was generated by Sencha Architect version 2.2.2.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Ext JS 4.2.x library, under independent license.
 * License of Sencha Architect does not include license for Ext JS 4.2.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('Spm.store.AuthenticatedAgent', {
    extend: 'Ext.data.Store',
    alias: 'store.authenticatedAgent',

    requires: [
        'Spm.proxy.SpmAjaxProxy',
        'Spm.model.Agent'
    ],

    constructor: function(cfg) {
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

    processAuthenticatedAgent: function(config) {
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

    onAuthenticatedAgentLoaded: function(store, records, successful, eOpts) {
        var queueStore = Ext.data.StoreManager.lookup('QueueStore');

        var jsonData = store.proxy.reader.jsonData;

        queueStore.loadRawData(jsonData);
    }

});