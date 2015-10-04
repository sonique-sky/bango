Ext.define('Spm.view.troublereport.TroubleReportDialog', {
    extend: 'Spm.component.StandardDialog',
    alias: 'widget.troubleReportDialog',

    requires: [
        'Ext.button.Button',
        'Ext.form.FieldContainer',
        'Ext.form.FieldSet',
        'Ext.form.Label',
        'Ext.form.Panel',
        'Ext.form.field.Checkbox',
        'Ext.form.field.ComboBox',
        'Ext.form.field.Date',
        'Ext.form.field.Text',
        'Ext.form.field.TextArea',
        'Ext.form.field.Time',
        'Ext.layout.container.HBox',
        'Ext.layout.container.VBox',
        'Ext.panel.Panel'
    ],

    cls: 'trouble-report-panel',
    controller: 'troubleReportDialog',
    viewModel: {type: 'troubleReportDialog'},

    bind: {
        title: '{titleForMode}',
        iconCls: '{iconForMode}'
    },

    defaultFocus: 'shortDescriptionField',

    modal: true,

    bodyPadding: 5,

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    width: 1000,
    minHeight: 200,

    autoRender: false,

    listeners: {
        afterrender: 'afterRender',
        show: 'onShow'
    },

    items: [
        {
            xtype: 'form',
            listeners: {
                validitychange: 'onValidityChange'
            },
            reference: 'troubleReportForm',
            items: [
                {
                    xtype: 'panel',
                    bind: {
                        hidden: '{!isResponseRequired}'
                    },
                    cls: 'response-required-text',
                    margin: '0 0 7 0',
                    layout: {
                        type: 'vbox',
                        align: 'middle'
                    },
                    height: 60,
                    items: [
                        {
                            xtype: 'label',
                            html: '<span>BT Openreach expect a specific amendment for this Trouble Report.<br/> Please review event history for more details.</span>',
                            margin: '5 0 5 0'
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
                            title: 'Trouble Report Details',
                            flex: 0.5,
                            margin: '0 5 0 5',
                            defaults: {
                                labelWidth: 150,
                                anchor: '100%'
                            },
                            items: [
                                {
                                    xtype: 'fieldcontainer',
                                    layout: {
                                        type: 'hbox'
                                    },
                                    bind: {
                                        hidden: '{isWlr3OrRoiService}'
                                    },
                                    fieldLabel: 'Short Description',
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            flex: 1,
                                            allowBlank: '{isWlr3OrRoiService}',
                                            bind: {
                                                value: '{troubleReportTemplate.description}',
                                                disabled: '{!isRaise}'
                                            },
                                            itemId: 'shortDescriptionField',
                                            reference: 'shortDescription'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'fieldcontainer',
                                    layout: {
                                        type: 'hbox'
                                    },
                                    bind: {
                                        hidden: '{!isWlr3OrRoiService}'
                                    },
                                    fieldLabel: 'Symptom',
                                    items: [
                                        {
                                            xtype: 'combobox',
                                            flex: 1,
                                            bind: {
                                                store: '{symptoms}',
                                                value: '{troubleReportTemplate.symptom.symptomCode}',
                                                disabled: '{!isRaise}'
                                            },
                                            valueField: 'symptomCode',
                                            displayField: 'description',
                                            typeAhead: true,
                                            queryMode: 'local',
                                            reference: 'symptomCode'
                                        }]
                                },
                                {
                                    xtype: 'fieldcontainer',
                                    layout: {
                                        type: 'hbox',
                                        padding: '0 5 0 0'
                                    },
                                    margin: '0 0 5 155',
                                    bind: {
                                        hidden: '{!isRoiBroadband}'
                                    },
                                    align: 'right',
                                    items: [
                                        {
                                            xtype: 'checkbox',
                                            bind: {
                                                value: '{troubleReportTemplate.broadbandFault}'
                                            },
                                            boxLabel: '242 - PSTN OK, Line Test Faulty',
                                            labelAlign: 'right'
                                        }]
                                },
                                {
                                    xtype: 'fieldcontainer',
                                    layout: {
                                        type: 'hbox'
                                    },
                                    bind: {
                                        hidden: '{isRoi}'
                                    },
                                    fieldLabel: 'Diagnostic Id',
                                    items: [
                                        {
                                            xtype: 'combobox',
                                            flex: 1,
                                            reference: 'diagnosticId',
                                            bind: {
                                                value: '{troubleReportTemplate.lineTestSummary.lineTestReference}',
                                                store: '{lineTest}',
                                                disabled: '{!isRaise}'
                                            },
                                            valueField: 'lineTestReference',
                                            displayField: 'lineTestReference',
                                            typeAhead: true,
                                            queryMode: 'local',
                                            emptyText: 'No Line Test Selected...',
                                            listeners: {
                                                expand: 'onExpand'
                                            }
                                        }]
                                },
                                {
                                    xtype: 'fieldcontainer',
                                    layout: {
                                        type: 'hbox',
                                        padding: '0 5 0 0'
                                    },
                                    bind: {
                                        hidden: '{!isWlr3}'
                                    },
                                    align: 'right',
                                    fieldLabel: 'Problem',
                                    items: [{
                                        xtype: 'checkbox',
                                        bind: {
                                            value: '{troubleReportTemplate.intermittentProblem}',
                                            disabled: '{!isRaise}'
                                        },
                                        boxLabel: 'Intermittent',
                                        labelAlign: 'right'
                                    }]
                                },
                                {
                                    xtype: 'fieldcontainer',
                                    layout: {
                                        type: 'hbox'
                                    },
                                    bind: {
                                        hidden: '{isWlr3OrRoiService}'
                                    },
                                    fieldLabel: 'Test Product',
                                    items: [
                                        {
                                            xtype: 'combobox',
                                            flex: 1,
                                            reference: 'testProduct',
                                            bind: {
                                                store: '{testProducts}',
                                                value: '{troubleReportTemplate.testProduct}',
                                                disabled: '{!isRaise}'
                                            },
                                            valueField: 'code',
                                            displayField: 'code',
                                            typeAhead: true,
                                            queryMode: 'local',
                                            emptyText: 'Select a Test Product...'
                                        }]
                                },
                                {
                                    xtype: 'fieldcontainer',
                                    layout: {
                                        type: 'hbox',
                                        padding: '0 5 0 0'
                                    },
                                    bind: {
                                        hidden: '{isRoi}'
                                    },
                                    fieldLabel: 'Engineer Options',
                                    items: [
                                        {
                                            xtype: 'checkbox',
                                            boxLabel: 'Co-Op Call Requested',
                                            labelAlign: 'right',
                                            bind: {
                                                disabled: '{!isCoopEnabledProduct}'
                                            },
                                            padding: '0 10 0 0'
                                        },
                                        {
                                            xtype: 'checkbox',
                                            boxLabel: 'DIS Requested',
                                            labelAlign: 'right',
                                            bind: {
                                                hidden: '{!canRequestDisEngineer}',
                                                disabled: '{!isDisEnabledProduct}'
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'combobox',
                                    flex: 1.0,
                                    displayField: 'upperTrcBand',
                                    valueField: 'upperTrcBand',
                                    store: {
                                        fields: ['upperTrcBand'],
                                        data: [
                                            ['0'],
                                            ['1'],
                                            ['2'],
                                            ['3'],
                                            ['4']
                                        ]
                                    },
                                    bind: {
                                        value: '{troubleReportTemplate.upperTrcBand}',
                                        hidden: '{isRaiseOrRoi}'
                                    },
                                    typeAhead: true,
                                    forceSelection: true,
                                    allowBlank: '{isRaiseOrRoi}',
                                    fieldLabel: 'TRC Band'
                                },
                                {
                                    xtype: 'fieldcontainer',
                                    layout: {
                                        type: 'hbox'
                                    },
                                    bind: {
                                        hidden: '{!isFttc}'
                                    },
                                    fieldLabel: 'Structured Question Code',
                                    items: [
                                        {
                                            xtype: 'combobox',
                                            flex: 1,
                                            reference: 'structuredQuestionCode',
                                            valueField: 'code',
                                            displayField: 'code',
                                            bind: {
                                                store: '{structuredQuestionCodes}',
                                                value: '{troubleReportTemplate.structuredQuestionCode}',
                                                disabled: '{!isRaise}'
                                            },
                                            typeAhead: true,
                                            queryMode: 'local',
                                            emptyText: 'Select a Structured Question Code...'
                                        }]
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
                                        value: '{troubleReportTemplate.contactName}'
                                    },
                                    fieldLabel: 'Contact Name',
                                    allowBlank: false
                                },
                                {
                                    xtype: 'textfield',
                                    reference: 'contactNumber',
                                    bind: {
                                        value: '{troubleReportTemplate.contactNumber}'
                                    },
                                    fieldLabel: 'Contact Number'
                                },
                                {
                                    xtype: 'textfield',
                                    reference: 'secondaryContactName',
                                    bind: {
                                        value: '{troubleReportTemplate.secondaryContactName}',
                                        hidden: '{!isWlr3}'
                                    },
                                    fieldLabel: 'Secondary Contact Name'
                                },
                                {
                                    xtype: 'textfield',
                                    reference: 'secondaryContactNumber',
                                    bind: {
                                        value: '{troubleReportTemplate.secondaryContactNumber}',
                                        hidden: '{isRoi}'
                                    },
                                    fieldLabel: 'Secondary Contact Number',
                                    allowBlank: false
                                },
                                {
                                    xtype: 'textfield',
                                    reference: 'temporaryCallDiversionNumber',
                                    bind: {
                                        value: '{troubleReportTemplate.temporaryCallDiversionNumber}',
                                        hidden: '{!isWlr3}'
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
                            margin: '0 5 0 5',
                            defaults: {
                                labelWidth: 150,
                                anchor: '100%'
                            },
                            bind: {
                                hidden: '{isRoi}'
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
                                            flex: 1.0,
                                            bind: {
                                                value: '{troubleReportTemplate.appointmentReference}',
                                                disabled: '{troubleReportTemplate.twentyFourHourAccess}'
                                            }
                                        },
                                        {
                                            xtype: 'button',
                                            text: 'Request Appointment',
                                            flex: 0.8,
                                            handler: 'onRequestAppointment',
                                            bind: {
                                                disabled: '{troubleReportTemplate.twentyFourHourAccess}'
                                            }
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
                                            flex: 1.0,
                                            bind: {
                                                value: '{twentyFourHourAccess}',
                                                disabled: '{hasAppointmentReference}'
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'fieldcontainer',
                                    layout: {
                                        type: 'hbox'
                                    },
                                    fieldLabel: 'Earliest Access Time',
                                    items: [
                                        {
                                            xtype: 'datefield',
                                            format: 'd/m/Y',
                                            altFormats: 'c',
                                            bind: {
                                                value: '{earliestAccessDate}',
                                                disabled: '{!canEnterAccessTimes}'
                                            }
                                        },
                                        {
                                            xtype: 'timefield',
                                            format: 'H:i',
                                            bind: {
                                                value: '{earliestAccessTime}',
                                                disabled: '{!canEnterAccessTimes}'
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'fieldcontainer',
                                    layout: {
                                        type: 'hbox'
                                    },
                                    fieldLabel: 'Latest Access Time',
                                    items: [
                                        {
                                            xtype: 'datefield',
                                            format: 'd/m/Y',
                                            altFormats: 'c',
                                            bind: {
                                                value: '{latestAccessDate}',
                                                disabled: '{!canEnterAccessTimes}'
                                            }
                                        },
                                        {
                                            xtype: 'timefield',
                                            format: 'H:i',
                                            bind: {
                                                value: '{latestAccessTime}',
                                                disabled: '{!canEnterAccessTimes}'
                                            }
                                        }
                                    ]
                                }
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
                                hidden: '{isRoi}'
                            },
                            items: [
                                {
                                    xtype: 'textarea',
                                    anchor: '100% 100%',
                                    fieldLabel: 'Access Hazards',
                                    bind: {
                                        value: '{troubleReportTemplate.accessHazards}'
                                    }
                                },
                                {
                                    xtype: 'textarea',
                                    anchor: '100% 100%',
                                    fieldLabel: 'Access Notes',
                                    bind: {
                                        value: '{troubleReportTemplate.accessNotes}'
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'fieldset',
                    flex: 1.0,
                    title: 'Additional Notes',
                    margin: '0 5 5 5',
                    items: [
                        {
                            xtype: 'textarea',
                            anchor: '100% 100%',
                            enforceMaxLength: true,
                            reference: 'additionalNotes',
                            bind: {
                                value: '{troubleReportTemplate.notes}'
                            }
                        }
                    ]
                }
            ]
        }
    ]

});
