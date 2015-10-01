Ext.define('Spm.proxy.AvailableAppointmentsProxy', {
    extend: 'Ext.data.proxy.Ajax',
    alias: 'proxy.availableAppointmentsProxy',

    buildUrl: function (request) {
        var params = request.getParams();

        if ('read' === request.getAction()) {
            var serviceProblemId = params.serviceProblemId;
            var appointmentStartDate = params.appointmentStartDate;
            var repairType = params.repairType;

            delete params.id;
            delete params.serviceProblemId;
            delete params.appointmentStartDate;
            delete params.repairType;

            return Ext.String.format('api/troubleReport/appointments/{0}/{1}/{2}', serviceProblemId, repairType, appointmentStartDate);
        }
    },

    reader: {
        type: 'json',
        rootProperty: 'data'
    }

});