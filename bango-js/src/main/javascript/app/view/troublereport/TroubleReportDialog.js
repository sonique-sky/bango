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
    height: 650,

    items: [
        {
            xtype: 'fieldcontainer',
            layout: {
                type: 'hbox',
                align: 'stretchmax'
            },
            flex: 1.0,
            defaults: {
                layout: 'form'
            },
            items: [
                {
                    xtype: 'fieldset',
                    title: 'Trouble Report Details',
                    flex: 0.5,
                    fieldDefaults: {
                        labelWidth: 150
                    },
                    margin: '0 5 0 0',
                    items: [
                        {
                            xtype: 'textfield',
                            bind: {
                                value: '{troubleReport.shortDescription}'
                            },
                            fieldLabel: 'Short Description'
                        },
                        {
                            xtype: 'combobox',
                            bind: {
                                value: '{troubleReport.shortDescription}'
                            },
                            fieldLabel: 'Diagnostic Id'
                        },
                        {
                            xtype: 'combobox',
                            bind: {
                                value: '{troubleReport.testProduct}'
                            },
                            fieldLabel: 'Test Product'
                        },
                        {
                            xtype: 'fieldcontainer',
                            layout: {
                                type: 'hbox',
                                padding: '0, 5, 0, 0'
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
                                value: '{troubleReport.trcBand}'
                            },
                            fieldLabel: 'TRC Band'
                        },
                        {
                            xtype: 'combobox',
                            bind: {
                                value: '{troubleReport.structuredQuestionCode}'
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
                    items: [
                        {
                            xtype: 'textfield',
                            bind: {
                                value: '{troubleReport.primaryContactName}'
                            },
                            fieldLabel: 'Contact Name'
                        },
                        {
                            xtype: 'textfield',
                            bind: {
                                value: '{troubleReport.primaryContactNumber}'
                            },
                            fieldLabel: 'Contact Number'
                        },
                        {
                            xtype: 'textfield',
                            bind: {
                                value: '{troubleReport.secondaryContactName}'
                            },
                            fieldLabel: 'Secondary Contact Name'
                        },
                        {
                            xtype: 'textfield',
                            bind: {
                                value: '{troubleReport.secondaryContactNumber}'
                            },
                            fieldLabel: 'Secondary Contact Number'
                        },
                        {
                            xtype: 'textfield',
                            bind: {
                                value: '{troubleReport.tcdNumber}'
                            },
                            fieldLabel: 'Temporary Call Diversion Number'
                        }
                    ]
                }
            ]
        },
        {
            xtype: 'fieldcontainer',
            flex: 1.0,
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            items: [
                {
                    xtype: 'fieldset',
                    title: 'Appointment / Access',
                    flex: 0.5,
                    margin: '0 5 0 0',
                },
                {
                    xtype: 'fieldset',
                    title: 'Access Information',
                    flex: 0.5,
                    margin: '0 5 0 0',

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