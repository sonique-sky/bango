Ext.define('Spm.view.troublereport.cancel.CancelTroubleReportDialogViewModel', {
    extend: 'Spm.component.StandardDialogViewModel',
    alias: 'viewmodel.cancelTroubleReportDialog',

    data: {
        acceptButtonDefaultDisabled: false,
        cancellationReason: null
    },

    formulas: {
        isWlr3OrFttc: {
            bind: {
                bindTo: '{serviceType}'
            },
            get: function (serviceType) {
                return serviceType.code === 'FTTC' || serviceType.code === 'WLR3';
            }
        }
    },

    cancellationReason: function () {
        return this.get('cancellationReason');
    },

    troubleReport: function () {
        return this.get('troubleReport');
    }

});
