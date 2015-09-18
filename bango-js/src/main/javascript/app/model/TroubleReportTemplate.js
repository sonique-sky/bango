Ext.define('Spm.model.TroubleReportTemplate', {
    extend: 'Ext.data.Model',
    alias: 'model.troubleReportTemplate',

    requires: [
        'Spm.proxy.TroubleReportTemplateProxy'
    ],

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
            dateFormat: 'c'
        },
        {
            name: 'latestAccessDate',
            type: 'date',
            dateFormat: 'c'
        }
    ],

    proxy: {
        type: 'troubleReportTemplateProxy'
    }

});