Ext.define('Spm.view.troublereport.eventhistory.TroubleReportEventHistoryPanelViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.troubleReportEventHistoryPanel',

    listen: {
        controller: {
            'serviceProblemTab': {
                troubleReportLoaded: 'onTroubleReportLoaded'
            }
        }
    },

    onTroubleReportLoaded: function (troubleReport) {
        this.getStore('troubleReportEventHistory').load({
            params: {
                troubleReportId: troubleReport.getData().troubleReportId
            }
        });
    }

});