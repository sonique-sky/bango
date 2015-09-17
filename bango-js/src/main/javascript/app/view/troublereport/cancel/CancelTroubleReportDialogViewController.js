Ext.define('Spm.view.troublereport.cancel.CancelTroubleReportDialogViewController', {
    extend: 'Spm.component.StandardDialogViewController',
    alias: 'controller.cancelTroubleReportDialog',

    onAccept: function () {
        var me = this;
        var viewModel = me.getViewModel();
        var troubleReportId = viewModel.get('troubleReport').troubleReportId();
        Ext.Ajax.request(
            {
                url: Ext.String.format('api/troubleReport/{0}/cancel', troubleReportId),
                method: 'POST',
                jsonData: {
                    cancellationReason: viewModel.cancellationReason()
                },
                scope: me,
                success: function () {
                    //me.fireEvent('serviceProblemCleared', serviceProblemId);
                    me.closeView();
                }
            }
        );
    }

});
