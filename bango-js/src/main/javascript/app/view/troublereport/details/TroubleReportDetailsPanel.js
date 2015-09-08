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
                                    value: '{serviceProblem.snsServiceId}'
                                },
                                fieldLabel: 'Service Id'
                            },
                            {
                                xtype: 'textfield',
                                bind: {
                                    value: '{serviceProblem.status}'
                                },
                                fieldLabel: 'Status'
                            },
                            {
                                xtype: 'textfield',
                                fieldLabel: 'Short Description',
                                bind: {
                                    value: '{serviceProblem.chordiantAccountNumber}'
                                }
                            },
                            {
                                xtype: 'textfield',
                                fieldLabel: 'Diagnostic Id',
                                bind: {
                                    value: '{serviceProblem.chordiantAccountNumber}'
                                }
                            },
                            {
                                xtype: 'textfield',
                                fieldLabel: 'Test Product',
                                bind: {
                                    value: '{serviceProblem.chordiantAccountNumber}'
                                }
                            },
                            {
                                xtype: 'textfield',
                                fieldLabel: 'TRC Band',
                                bind: {
                                    value: '{serviceProblem.chordiantAccountNumber}'
                                }
                            },
                            {
                                xtype: 'textarea',
                                fieldLabel: 'Notes',
                                bind: {
                                    value: '{serviceProblem.chordiantAccountNumber}'
                                }
                            }
                        ]
                    }
                ]
            }]
    }
);