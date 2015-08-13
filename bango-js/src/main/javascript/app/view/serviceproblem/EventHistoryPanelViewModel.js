Ext.define('Spm.view.serviceproblem.EventHistoryPanelViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.eventHistoryPanel',

    stores: {
        eventHistory: {
            type: 'eventHistory'
        }
    },

    data: {
    }

});
