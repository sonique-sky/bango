Ext.define('Spm.view.troublereport.cancel.CancelTroubleReportDialogViewModel', {
    extend: 'Spm.component.StandardDialogViewModel',
    alias: 'viewmodel.cancelTroubleReportDialog',

    data: {
        acceptButtonDefaultDisabled: false,
        cancellationReason: null
    },

    stores: {},

    formulas: {},

    cancellationReason: function () {
        this.get('cancellationReason');
    }

});
