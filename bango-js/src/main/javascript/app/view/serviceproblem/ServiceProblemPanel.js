Ext.define('Spm.view.serviceproblem.ServiceProblemPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.serviceProblemPanel',

    requires: [
        'Ext.container.Container',
        'Ext.form.FieldContainer',
        'Ext.form.field.Date',
        'Ext.form.field.Text',
        'Ext.layout.container.Form',
        'Ext.layout.container.HBox',
        'Ext.layout.container.VBox'
    ],

    layout: {
        align: 'stretch',
        type: 'vbox'
    },

    title: 'Service Problem',
    frame: true,
    fieldDefaults: {
        disabled: true
    },

    bind: {
        iconCls: '{assignedStateIconClass}'
    },

    items: [
        {
            xtype: 'container',
            layout: {
                align: 'stretch',
                type: 'hbox'
            },
            defaults: {
                layout: 'form',
                minWidth: 260,
                defaults: {readOnly:true}
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
                                value: '{serviceProblem.serviceProblemId}'
                            },
                            fieldLabel: 'Service Problem Id'
                        },
                        {
                            xtype: 'textfield',
                            bind: {
                                value: '{serviceProblem.snsServiceId}'
                            },
                            fieldLabel: 'Service Id'
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Chordiant Acc No',
                            bind: {
                                value: '{serviceProblem.chordiantAccountNumber}'
                            }
                        }
                    ]
                },
                {
                    xtype: 'fieldcontainer',
                    flex: 1,
                    margin: '0 0 0 3',
                    items: [
                        {
                            xtype: 'textfield',
                            name: 'status',
                            bind: {
                                value: '{serviceProblem.status}'
                            },
                            fieldLabel: 'Status'
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Service Type',
                            bind: {
                                value: '{serviceProblem.serviceType.description} ({serviceProblem.assignmentCode})'
                            }
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Operator Ref',
                            bind: {
                                value: '{serviceProblem.operatorReference}'
                            }
                        }
                    ]
                },
                {
                    xtype: 'fieldcontainer',
                    flex: 1,
                    margin: '0 0 0 3',
                    items: [
                        {
                            xtype: 'datefield',
                            fieldLabel: 'Opened Date',
                            bind: {
                                value: '{serviceProblem.openedDate}'
                            },
                            format: 'd/m/y H:i',
                            hideTrigger: true
                        },
                        {
                            xtype: 'datefield',
                            fieldLabel: 'Closed Date',
                            bind: {
                                value: '{serviceProblem.closedDate}'
                            },
                            format: 'd/m/y H:i',
                            hideTrigger: true
                        }
                    ]
                },
                {
                    xtype: 'fieldcontainer',
                    flex: 1,
                    margin: '0 0 0 3',
                    items: [
                        {
                            xtype: 'textfield',
                            bind: {
                                value: '{serviceProblem.directoryNumber}'
                            },
                            fieldLabel: 'Directory No'
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Customer Name',
                            bind: {
                                value: '{serviceProblem.customerName}'
                            }
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Contact No',
                            bind: {
                                value: '{serviceProblem.contactNumber}'
                            }
                        }
                    ]
                }
            ]
        },
        {
            xtype: 'fieldcontainer',
            minWidth: 1050,
            fieldDefaults: {
                labelWidth: 110,
                readOnly:true
            },
            layout: 'form',
            items: [
                {
                    xtype: 'textfield',
                    fieldLabel: 'Queue',
                    bind: {
                        value: '{serviceProblem.queue.name}'
                    }
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Problem',
                    bind: {
                        value: '{serviceProblem.problem}'
                    }
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Fault',
                    bind: {
                        value: '{serviceProblem.fault}'
                    }
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Cause',
                    bind: {
                        value: '{serviceProblem.cause}'
                    }
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Resolution Reason',
                    bind: {
                        value: '{serviceProblem.resolutionReason}'
                    }
                }
            ]
        }
    ]

});
