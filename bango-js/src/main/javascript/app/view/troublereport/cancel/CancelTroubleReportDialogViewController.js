Ext.define('Spm.view.troublereport.cancel.CancelTroubleReportDialogViewController', {
    extend: 'Spm.component.StandardDialogViewController',
    alias: 'controller.cancelTroubleReportDialog',

    onShow: function () {
        var serviceType = this.getViewModel().get('serviceType');
        if (serviceType.code === 'FTTC') {
            this.getViewModel().set('cancellationReason', 'FTTCCAN5');
        }

        if (serviceType.code === 'WLR3') {
            this.getViewModel().set('cancellationReason', 'CAN010');
        }
    },

    onAccept: function () {
        var me = this;
        var viewModel = me.getViewModel();
        var troubleReportId = viewModel.troubleReport().troubleReportId();
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
