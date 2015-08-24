Ext.define('Spm.view.troublereport.TroubleReportDialog', {
    extend: 'Spm.component.StandardDialog',
    alias: 'widget.troubleReportDialog',

    controller: 'troubleReportDialog',
    viewModel: 'troubleReportDialog',
    title: 'Create Trouble Report',

    defaultFocus: 'shortDescriptionField',

    modal: true,

    bodyPadding: 5,

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    width: 1000,
    minHeight: 450,

    listeners: {
        beforeshow: 'onBeforeShow'
    },

    items: [
        // +++++= Remove when layout done
        {
            xtype: 'combobox',
            displayField: 'serviceType',
            valueField: 'serviceType',
            store: {
                fields: ['serviceType'],
                data: [
                    ['Fttc'],
                    ['Wlr3'],
                    ['RoiFttc']
                ]
            },
            bind: {
                value: '{troubleReportTemplate.serviceType}'
            },
            dock: 'top'

        },
        // +++++=
        {
            xtype: 'fieldcontainer',
            layout: {
                type: 'hbox',
                align: 'stretchmax'
            },
            items: [
                {
                    xtype: 'fieldset',
                    title: 'Trouble Report Details',
                    flex: 0.5,
                    margin: '0 5 0 0',
                    defaults: {
                        labelWidth: 150,
                        anchor: '100%'
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            bind: {
                                value: '{troubleReportTemplate.shortDescription}',
                                hidden: '{isRoiFttc}'
                            },
                            fieldLabel: 'Short Description'
                        },
                        {
                            xtype: 'combobox',
                            bind: {
                                value: '{troubleReportTemplate.symptom}',
                                hidden: '{!isRoiFttc}'
                            },
                            fieldLabel: 'Symptom'
                        },
                        {
                            xtype: 'combobox',
                            bind: {
                                value: '{troubleReportTemplate.diagnosticId}',
                                hidden: '{isRoiFttc}'
                            },
                            fieldLabel: 'Diagnostic Id'
                        },
                        {
                            xtype: 'combobox',
                            bind: {
                                value: '{troubleReportTemplate.testProduct}',
                                hidden: '{isRoiFttc}'
                            },
                            fieldLabel: 'Test Product'
                        },
                        {
                            xtype: 'fieldcontainer',
                            layout: {
                                type: 'hbox',
                                padding: '0 5 0 0'
                            },
                            bind: {
                                hidden: '{isRoiFttc}'
                            },
                            fieldLabel: 'Engineer Options',
                            items: [
                                {
                                    xtype: 'checkbox',
                                    boxLabel: 'Co-Op Call Requested',
                                    labelAlign: 'right',
                                    flex: 1.0
                                },
                                {
                                    xtype: 'checkbox',
                                    boxLabel: 'DIS Requested',
                                    labelAlign: 'right',
                                    flex: 1.0
                                }
                            ]
                        },
                        {
                            xtype: 'combobox',
                            bind: {
                                value: '{troubleReportTemplate.trcBand}',
                                hidden: '{isRoiFttc}'
                            },
                            fieldLabel: 'TRC Band'
                        },
                        {
                            xtype: 'combobox',
                            bind: {
                                value: '{troubleReportTemplate.structuredQuestionCode}',
                                hidden: '{isRoiFttc}'
                            },
                            fieldLabel: 'Structured Question Code'
                        }
                    ]
                },
                {
                    xtype: 'fieldset',
                    title: 'Customer Contact Details',
                    flex: 0.5,
                    margin: '0 5 0 0',
                    defaults: {
                        labelWidth: 190,
                        anchor: '100%'
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            bind: {
                                value: '{troubleReportTemplate.primaryContactName}'
                            },
                            fieldLabel: 'Contact Name'
                        },
                        {
                            xtype: 'textfield',
                            bind: {
                                value: '{troubleReportTemplate.primaryContactNumber}'
                            },
                            fieldLabel: 'Contact Number'
                        },
                        {
                            xtype: 'textfield',
                            bind: {
                                value: '{troubleReportTemplate.secondaryContactName}',
                                hidden: '{isRoiFttc}'
                            },
                            fieldLabel: 'Secondary Contact Name'
                        },
                        {
                            xtype: 'textfield',
                            bind: {
                                value: '{troubleReportTemplate.secondaryContactNumber}',
                                hidden: '{isRoiFttc}'
                            },
                            fieldLabel: 'Secondary Contact Number'
                        },
                        {
                            xtype: 'textfield',
                            bind: {
                                value: '{troubleReportTemplate.tcdNumber}',
                                hidden: '{isRoiFttc}'
                            },
                            fieldLabel: 'Temporary Call Diversion Number'
                        }
                    ]
                }
            ]
        },
        {
            xtype: 'fieldcontainer',
            layout: {
                type: 'hbox',
                align: 'stretchmax'
            },
            items: [
                {
                    xtype: 'fieldset',
                    title: 'Appointment / Access',
                    flex: 0.5,
                    margin: '0 5 0 0',
                    defaults: {
                        labelWidth: 150,
                        anchor: '100%'
                    },
                    bind: {
                        hidden: '{isRoiFttc}'
                    },
                    items: [
                        {
                            xtype: 'fieldcontainer',
                            layout: {
                                type: 'hbox'
                            },
                            fieldLabel: 'Appointment Reference',
                            items: [
                                {
                                    xtype: 'textfield',
                                    flex: 1.0
                                },
                                {
                                    xtype: 'button',
                                    text: 'Request Appointment',
                                    flex: 0.8
                                }
                            ]
                        },
                        {
                            xtype: 'fieldcontainer',
                            layout: {
                                type: 'hbox'
                            },
                            fieldLabel: 'Access',
                            items: [
                                {
                                    xtype: 'checkbox',
                                    boxLabel: '24 Hour?',
                                    labelAlign: 'right',
                                    flex: 1.0
                                }
                            ]
                        },
                        {
                            xtype: 'textfield',
                            bind: {
                                value: '{troubleReportTemplate.shortDescription}'
                            },
                            fieldLabel: 'Short Description'
                        },

                    ]
                },
                {
                    xtype: 'fieldset',
                    title: 'Access Information',
                    flex: 0.5,
                    margin: '0 5 0 0',
                    defaults: {
                        labelWidth: 190,
                        anchor: '100%'
                    },
                    bind: {
                        hidden: '{isRoiFttc}'
                    },
                    items: [
                        {
                            xtype: 'textarea',
                            anchor: '100% 100%',
                            fieldLabel: 'Access Hazards'
                        },
                        {
                            xtype: 'textarea',
                            anchor: '100% 100%',
                            fieldLabel: 'Access Notes'
                        }
                    ]
                }
            ]
        },
        {
            xtype: 'fieldset',
            flex: 1.0,
            title: 'Additional Notes',
            items: [
                {
                    xtype: 'textarea',
                    anchor: '100% 100%'
                }
            ]
        }
    ]

});