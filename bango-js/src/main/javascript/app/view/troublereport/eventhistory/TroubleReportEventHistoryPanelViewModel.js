Ext.define('Spm.view.troublereport.eventhistory.TroubleReportEventHistoryPanelViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.troubleReportEventHistoryPanel',

    stores: {
        troubleReportEventHistory: {
            alias: 'store.troubleReportEventHistory',
            model: 'Spm.model.EventHistoryItem',
            proxy: 'troubleReportEventHistoryProxy'
        }
    }

});
