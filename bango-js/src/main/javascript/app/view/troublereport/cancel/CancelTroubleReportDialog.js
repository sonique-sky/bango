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

    listeners: {
        show: 'onShow'
    },
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
                    xtype: 'fieldcontainer',
                    layout: {
                        type: 'hbox',
                        padding: '0 5 0 0'
                    },
                    fieldLabel: 'Cancellation Reason',
                    items: [
                        {
                            xtype: 'textfield',
                            flex: 1,
                            width: 350,
                            bind: {
                                value: '{cancellationReason}',
                                disabled: '{isWlr3OrFttc}'
                            },
                            reference: 'cancellationReason'
                        }
                    ]
                }
            ]
        }
    ]
});
