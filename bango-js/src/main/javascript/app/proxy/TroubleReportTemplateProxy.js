Ext.define('Spm.proxy.TroubleReportTemplateProxy', {
    extend: 'Ext.data.proxy.Ajax',
    alias: 'proxy.troubleReportTemplateProxy',

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
            if ('Raise' === params.mode) {
                delete params.serviceProblemId;
                delete params.troubleReportId;
                delete params.mode;

                return Ext.String.format('api/troubleReport/raise');
            }
            if ('Amend' === params.mode) {
                delete params.serviceProblemId;
                delete params.troubleReportId;
                delete params.mode;

                return Ext.String.format('api/troubleReport/amend');
            }
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
