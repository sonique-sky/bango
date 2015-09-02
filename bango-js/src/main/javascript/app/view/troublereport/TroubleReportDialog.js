Ext.define('Spm.view.troublereport.TroubleReportDialog', {
    extend: 'Spm.component.StandardDialog',
    alias: 'widget.troubleReportDialog',

    cls: 'trouble-report-panel',
    controller: 'troubleReportDialog',
    viewModel: 'troubleReportDialog',
    title: 'Create Trouble Report',
    iconCls: 'icon-create-trouble-report',

    defaultFocus: 'shortDescriptionField',

    modal: true,

    bodyPadding: 5,

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    width: 1000,
    minHeight: 200,

    listeners: {
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
                                    xtype: 'textfield',
                                    bind: {
                                        value: '{troubleReportTemplate.description}',
                                        hidden: '{isWlr3OrRoiService}'
                                    },
                                    fieldLabel: 'Short Description'
                                },
                                {
                                    xtype: 'combobox',
                                    bind: {
                                        store: '{symptoms}',
                                        value: '{troubleReportTemplate.symptom.symptomCode}',
                                        hidden: '{!isWlr3OrRoiService}'
                                    },
                                    fieldLabel: 'Symptom',
                                    valueField: 'symptomCode',
                                    displayField: 'description',
                                    typeAhead: true,
                                    forceSelection: true,
                                    queryMode: 'local'
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
                                    xtype: 'combobox',
                                    bind: {
                                        value: '{troubleReportTemplate.lineTestSummary.lineTestReference}',
                                        hidden: '{isRoi}',
                                        store: '{lineTest}'

                                    },
                                    fieldLabel: 'Diagnostic Id',
                                    valueField: 'lineTestReference',
                                    displayField: 'lineTestReference',
                                    typeAhead: true,
                                    queryMode: 'local',
                                    listeners: {
                                        expand: 'onExpand'
                                    }
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
                                            value: '{troubleReportTemplate.intermittentProblem}'
                                        },
                                        boxLabel: 'Intermittent',
                                        labelAlign: 'right'
                                    }]
                                },

                                {
                                    xtype: 'combobox',
                                    bind: {
                                        store: '{testProducts}',
                                        value: '{troubleReportTemplate.testProduct}',
                                        hidden: '{isWlr3OrRoiService}'
                                    },
                                    fieldLabel: 'Test Product',
                                    valueField: 'code',
                                    displayField: 'code',
                                    typeAhead: true,
                                    forceSelection: true,
                                    queryMode: 'local',
                                    emptyText: 'Select a Test Product...'
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
                                    bind: {
                                        value: '{troubleReportTemplate.upperTrcBand}',
                                        hidden: '{isRaiseOrRoi}'
                                    },
                                    fieldLabel: 'TRC Band'
                                },
                                {
                                    xtype: 'combobox',
                                    fieldLabel: 'Structured Question Code',
                                    valueField: 'code',
                                    displayField: 'code',
                                    bind: {
                                        store: '{structuredQuestionCodes}',
                                        value: '{troubleReportTemplate.structuredQuestionCode}',
                                        hidden: '{!isFttc}'
                                    },
                                    typeAhead: true,
                                    forceSelection: true,
                                    queryMode: 'local',
                                    emptyText: 'Select a Structured Question Code...'
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
                                    fieldLabel: 'Contact Name'
                                },
                                {
                                    xtype: 'textfield',
                                    bind: {
                                        value: '{troubleReportTemplate.contactNumber}'
                                    },
                                    fieldLabel: 'Contact Number'
                                },
                                {
                                    xtype: 'textfield',
                                    readOnly: true,
                                    bind: {
                                        value: '{troubleReportTemplate.secondaryContactName}',
                                        hidden: '{!isWlr3}'
                                    },
                                    fieldLabel: 'Secondary Contact Name'
                                },
                                {
                                    xtype: 'textfield',
                                    bind: {
                                        value: '{troubleReportTemplate.secondaryContactNumber}',
                                        hidden: '{isRoi}'
                                    },
                                    fieldLabel: 'Secondary Contact Number'
                                },
                                {
                                    xtype: 'textfield',
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
                            anchor: '100% 100%'
                        }
                    ]
                }
            ]
        }
    ]
})
;