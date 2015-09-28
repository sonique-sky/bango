Ext.define('Spm.proxy.TroubleReportProxy', {
    extend: 'Ext.data.proxy.Ajax',
    alias: 'proxy.troubleReportProxy',

    idParam: 'serviceProblemId',

    model: 'Spm.model.TroubleReport',

    requires: [
        'Spm.model.TroubleReport'
    ],

    buildUrl: function (request) {
        var params = request.getParams();

        var id = params.serviceProblemId;

        delete params.serviceProblemId;
        delete params.id;

        return Ext.String.format('api/troubleReport/serviceProblemId/{0}', id);
    },

    reader: {
        type: 'json',
        rootProperty: 'data'
    }

});
