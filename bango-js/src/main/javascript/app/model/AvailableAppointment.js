Ext.define('Spm.model.AvailableAppointment', {
    extend: 'Ext.data.Model',
    alias: 'model.availableAppointment',
    fields: [
        {
            name: 'appointmentDate',
            type: 'date',
            dateFormat: 'd/m/Y H:i:s'
        },
        {
            name: 'amTimeSlotAvailable'
        },
        {
            name: 'pmTimeSlotAvailable'
        }
    ]

});