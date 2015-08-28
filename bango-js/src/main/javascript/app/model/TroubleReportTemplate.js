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
        },
        {
            name: 'appointmentReference',
            type: 'string'
        },
        {
            name: 'twentyFourHourAccess',
            type: 'boolean',
            defaultValue: false
        },
        {
            name: 'earliestAccessDate',
            type: 'date',
            dateFormat: 'd/m/Y H:i:s'
        },
        {
            name: 'latestAccessDate',
            type: 'date',
            dateFormat: 'd/m/Y H:i:s'
        }
    ],

    proxy: {
        type: 'troubleReportProxy'
    }

});