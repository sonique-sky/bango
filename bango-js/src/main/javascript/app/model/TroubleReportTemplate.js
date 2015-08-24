Ext.define('Spm.model.TroubleReportTemplate', {
    extend: 'Ext.data.Model',
    alias: 'model.troubleReportTemplate',

    idProperty: 'troubleReportId',

    fields: [
        {
            name: 'troubleReportId',
            type: 'int',
            defaultValue: 0
        },
        {
            name: 'serviceProblemId',
            type: 'int'
        }
    ],

    proxy: {
        type: 'troubleReportProxy'
    }

});