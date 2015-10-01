Ext.define('Spm.view.dashboard.msp.MspDashboardTabModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.mspDashboard',

    requires: [
        'Ext.data.proxy.Ajax',
        'Ext.data.reader.Json',
        'Spm.proxy.MajorServiceProblemEventHistoryProxy'
    ],

    stores: {
        mspDashboardEntries: {
            fields: ['id', 'description', 'startDate', 'outageId', 'expectedResolutionDate', 'serviceProblemCount', 'serviceCount'],
            pageSize: 0,
            proxy: {
                type: 'ajax',
                url: 'api/msp',
                reader: {
                    type: 'json',
                    rootProperty: 'data'
                }
            }
        }
    },

    data: {
        eventHistoryProxy: Ext.create('Spm.proxy.MajorServiceProblemEventHistoryProxy')
    }

});