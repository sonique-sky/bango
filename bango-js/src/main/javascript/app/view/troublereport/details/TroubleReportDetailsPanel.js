Ext.define('Spm.view.troublereport.details.TroubleReportDetailsPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.troubleReportDetailsPanelTab',

    layout: {
        align: 'stretch',
        type: 'vbox'
    },
    frame: true,
    fieldDefaults: {
        disabled: true
    },
    title: 'Trouble Report Details',

    items: [
        {
            xtype: 'container',
            layout: {
                align: 'stretch',
                type: 'hbox'
            },
            defaults: {
                layout: 'form',
                defaults: {readOnly: true}
            },
            items: [
                {
                    xtype: 'fieldcontainer',
                    flex: 1,
                    fieldDefaults: {
                        labelWidth: 110
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            bind: {
                                value: '{troubleReport.serviceId}'
                            },
                            fieldLabel: 'Service Id'
                        },
                        {
                            xtype: 'textfield',
                            bind: {
                                value: '{troubleReport.status}'
                            },
                            fieldLabel: 'Status'
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Short Description',
                            bind: {
                                value: '{troubleReport.shortDescription}'
                            }
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Diagnostic Id',
                            bind: {
                                value: '{troubleReport.diagnosticId}'
                            }
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Test Product',
                            bind: {
                                value: '{troubleReport.testProduct}'
                            }
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'TRC Band',
                            bind: {
                                value: '{troubleReport.trcBand}'
                            }
                        },
                        {
                            xtype: 'textarea',
                            fieldLabel: 'Notes',
                            bind: {
                                value: '{troubleReport.notes}'
                            }
                        }
                    ]
                }
            ]
        }
    ]

});
