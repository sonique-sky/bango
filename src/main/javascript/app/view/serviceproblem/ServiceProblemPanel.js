Ext.define('Spm.view.serviceproblem.ServiceProblemPanel', {
    extend: 'Ext.form.Panel',
    alias: 'widget.serviceProblemPanel',

    layout: {
        align: 'stretch',
        type: 'vbox'
    },
    title: 'Service Problem',
    frame: true,

    initComponent: function() {
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
                                    fieldLabel: 'Service Id'
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Chordiant Acc No'
                                }
                            ]
                        },
                        {
                            xtype: 'fieldcontainer',
                            flex: 1,
                            items: [
                                {
                                    xtype: 'textfield',
                                    name: 'status',
                                    fieldLabel: 'Status'
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Service Type'
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Operator Ref'
                                }
                            ]
                        },
                        {
                            xtype: 'fieldcontainer',
                            flex: 1,
                            items: [
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Opened Date'
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Closed Date'
                                }
                            ]
                        },
                        {
                            xtype: 'fieldcontainer',
                            flex: 1,
                            items: [
                                {
                                    xtype: 'textfield',
                                    name: 'directoryNumber',
                                    fieldLabel: 'Directory No'
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Customer Name'
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Contact No'
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
                            fieldLabel: 'Queue'
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Problem'
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Fault'
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Cause'
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Resolution Reason'
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    }

});