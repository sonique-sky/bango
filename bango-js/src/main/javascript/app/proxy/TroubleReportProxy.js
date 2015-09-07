Ext.define('Spm.proxy.TroubleReportProxy', {
    extend: 'Ext.data.proxy.Ajax',
    alias: 'proxy.troubleReportProxy',

    idParam: 'troubleReportId',

    buildUrl: function (request) {
        var params = request.getParams();

        if ('read' === request.getAction()) {
            var id = params.serviceProblemId;

            delete params.serviceProblemId;
            delete params.troubleReportId;

            return Ext.String.format('api/troubleReport/template/serviceProblemId/{0}', id);
        }
        if ('create' === request.getAction()) {
            delete params.serviceProblemId;
            delete params.troubleReportId;

            return Ext.String.format('api/troubleReport/raise');
        }
    },

    reader: {
        type: 'json'
    },

    writer: {
        type: 'json',
        writeAllFields: true,
        allowSingle: true,
        rootProperty: 'troubleReportTemplate',
        encoded: true
    }
});
