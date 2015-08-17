Ext.define('Spm.view.serviceproblem.eventhistory.FilterEventHistoryDialogViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.filterEventHistoryDialog',

    stores: {
        eventTypes: {
            type: 'eventHistoryItemType'
        }
    },

    data: {
        acceptButtonText: 'Filter',
        cancelButtonHidden: true,
        historyItemTypes: []
    }

});
