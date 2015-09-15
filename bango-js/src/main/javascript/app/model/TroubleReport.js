Ext.define('Spm.model.TroubleReport', {
    extend: 'Ext.data.Model',
    alias: 'model.troubleReport',

    idProperty: 'serviceProblemId',

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
        type: 'troubleReportProxy'
    },

    troubleReportId: function() {
        return this.get('troubleReportId');
    }

});