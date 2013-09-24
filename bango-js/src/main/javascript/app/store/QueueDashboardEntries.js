Ext.define('Spm.store.QueueDashboardEntries', {
    extend: 'Ext.data.Store',
    alias: 'store.queueDashboardEntries',

    requires: [
        'Spm.model.QueueDashboardEntry'
    ],

    statics: {
        queueDashboardEntriesStore: function () {
            return Ext.create('Spm.store.QueueDashboardEntries', {operationFactory: Spm.proxy.ApiOperation.queueDashboardEntries, proxy: Spm.proxy.QueueDashboardEntryApiProxy});
        }
    },

    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            autoLoad: false,
            filterOnLoad: false,
            model: 'Spm.model.QueueDashboardEntry',
            sortOnLoad: false
        }, cfg)]);
    }
});