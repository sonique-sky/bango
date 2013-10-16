Ext.define('Spm.view.serviceproblem.ServiceProblemPanel', {
    extend: 'Spm.view.component.AssociationCapableForm',
    alias: 'widget.serviceProblemPanel',

    requires: [
        'Ext.layout.container.Form',
        'Ext.form.Label'
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

    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'container',
                    layout: {
                        align: 'stretch',
                        type: 'hbox'
                    },
                    defaults: {
                        layout: 'form'
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
                                    name: 'serviceProblemId',
                                    fieldLabel: 'Service Problem Id'
                                },
                                {
                                    xtype: 'textfield',
                                    name: 'snsServiceId',
                                    fieldLabel: 'Service Id'
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Chordiant Acc No',
                                    name: 'chordiantAccountNumber'
                                }
                            ]
                        },
                        {
                            xtype: 'fieldcontainer',
                            flex: 1,
                            margins: '0, 0, 0 3',
                            items: [
                                {
                                    xtype: 'textfield',
                                    name: 'status',
                                    fieldLabel: 'Status'
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Service Type',
                                    name: 'serviceType.description'
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Operator Ref',
                                    name: 'operatorReference'
                                }
                            ]
                        },
                        {
                            xtype: 'fieldcontainer',
                            flex: 1,
                            margins: '0, 0, 0 3',
                            items: [
                                {
                                    xtype: 'datefield',
                                    fieldLabel: 'Opened Date',
                                    name: 'openedDate',
                                    format: 'd/m/y H:i',
                                    hideTrigger: true
                                },
                                {
                                    xtype: 'datefield',
                                    fieldLabel: 'Closed Date',
                                    name: 'closedDate',
                                    format: 'd/m/y H:i',
                                    hideTrigger: true
                                }
                            ]
                        },
                        {
                            xtype: 'fieldcontainer',
                            flex: 1,
                            margins: '0, 0, 0 3',
                            items: [
                                {
                                    xtype: 'textfield',
                                    name: 'directoryNumber',
                                    fieldLabel: 'Directory No'
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Customer Name',
                                    name: 'customerName'
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Contact No',
                                    name: 'contactNumber'
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'fieldcontainer',
                    fieldDefaults: {
                        labelWidth: 110
                    },
                    layout: 'form',
                    items: [
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Queue',
                            name: 'queue.name'
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Problem',
                            name: 'problem'
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Fault',
                            name: 'fault'
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Cause',
                            name: 'cause'
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Resolution Reason',
                            name: 'resolutionReason'
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    },

    bindTo: function (serviceProblem) {
        this.loadRecord(serviceProblem);
    }
});