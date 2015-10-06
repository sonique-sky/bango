Ext.define('Spm.view.dashboard.msp.MspDashboardTabViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.mspDashboard',

    requires: [
        'Ext.data.proxy.Ajax',
        'Ext.data.reader.Json',
        'Spm.proxy.MajorServiceProblemEventHistoryProxy'
    ],

    data: {
        eventHistoryProxy: Ext.create('Spm.proxy.MajorServiceProblemEventHistoryProxy'),
        displayRecentlyClosed: false,
        selectedMsp: null
    },

    stores: {
        mspDashboardEntries: {
            fields: ['id', 'description', 'startDate', 'outageId', 'expectedResolutionDate', 'serviceProblemCount', 'serviceCount'],
            pageSize: 0,

            remoteSort: true,
            remoteFilter: true,

            sorters: 'id',

            listeners: {
                load: 'storeLoaded'
            },

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

    formulas: {
        closeButtonDisabled: {
            bind: {
                bindTo: '{selectedMsp.closedDate}',
                deep: true
            },
            get: function (closedDate) {
                return closedDate;
            }
        }
    },


    selectedMsp: function () {
        return this.get('selectedMsp');
    }

});