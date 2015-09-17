Ext.define('Spm.view.troublereport.cancel.CancelTroubleReportDialog', {
    extend: 'Spm.component.StandardDialog',
    alias: 'widget.cancelTroubleReportDialog',

    viewModel: {type: 'cancelTroubleReportDialog'},
    controller: 'cancelTroubleReportDialog',

    iconCls: 'icon-cancel-trouble-report',

    closable: true,

    title: 'Cancel Trouble Report',

    height: 110,
    width: 400,

    items: [
        {
            xtype: 'form',
            bodyPadding: 10,
            reference: 'cancelTroubleReportForm',
            defaults: {
                labelWidth: 150
            },
            items: [
                {
                    xtype: 'textfield',
                    flex: 1,
                    width: 350,
                    bind: {
                        value: '{cancellationReason}'
                    },
                    fieldLabel: 'Cancellation Reason',
                    reference: 'cancellationReason'
                }
            ]
        }
    ]
});
