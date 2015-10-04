Ext.define('Spm.view.serviceproblem.msp.AssociateServiceProblemToMspDialogViewModel', {
    extend: 'Spm.component.StandardDialogViewModel',
    alias: 'viewmodel.associateServiceProblemToMspDialog',

    stores: {
        mspDashboardEntries: {
            fields: ['id', 'description', 'startDate'],
            autoLoad: true,
            pageSize: 0,
            proxy: {
                type: 'ajax',
                url: 'api/msp',
                reader: {
                    type: 'json',
                    rootProperty: 'data'
                }
            },
            listeners: {
                load: 'selectFirstRow'
            }
        }
    },

    serviceProblemId: function () {
        return this.get('serviceProblem.serviceProblemId');
    }

});
