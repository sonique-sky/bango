Ext.define('Spm.proxy.TroubleReportEventHistoryProxy', {
    extend: 'Ext.data.proxy.Ajax',
    alias: 'proxy.troubleReportEventHistoryProxy',

    requires: [
        'Ext.data.reader.Json'
    ],

    buildUrl: function (request) {
        var params = request.getParams();

        var troubleReportId = params.troubleReportId;

        delete params.id;
        delete params.troubleReportId;

        return Ext.String.format('api/troubleReport/{0}/eventHistory', troubleReportId);
    },

    reader: {
        type: 'json',
        rootProperty: 'data'
    }

});