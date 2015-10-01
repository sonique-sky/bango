Ext.define('Spm.proxy.ServiceProblemEventHistoryProxy', {
    extend: 'Ext.data.proxy.Ajax',
    alias: 'proxy.serviceProblemEventHistoryProxy',

    requires: [
        'Ext.data.reader.Json'
    ],

    reader: {
        type: 'json',
        rootProperty: 'data'
    },

    buildUrl: function (request) {
        return Ext.String.format('api/eventHistory');
    }
});