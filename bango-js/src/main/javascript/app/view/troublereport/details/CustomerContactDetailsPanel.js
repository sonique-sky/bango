Ext.define('Spm.view.troublereport.details.CustomerContactDetailsPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.customerContactDetailsPanelTab',

    layout: {
        align: 'stretch',
        type: 'vbox'
    },
    frame: true,
    fieldDefaults: {
        disabled: true
    },
    title: 'Customer Contact Details',

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
                                value: '{troubleReport.appointmentReference}'
                            },
                            fieldLabel: 'Appointment Ref'
                        },
                        {
                            xtype: 'textfield',
                            bind: {
                                value: '{troubleReport.accessHazards}'
                            },
                            fieldLabel: 'Access Hazards'
                        },
                        {
                            xtype: 'textfield',
                            bind: {
                                value: '{troubleReport.accessNotes}'
                            },
                            fieldLabel: 'Access Notes'
                        },
                        {
                            xtype: 'textfield',
                            bind: {
                                value: '{troubleReport.twentyFourHourAccess}'
                            },
                            fieldLabel: '24Hr Access?'
                        },
                        {
                            xtype: 'textfield',
                            bind: {
                                value: '{troubleReport.question}'
                            },
                            fieldLabel: 'Question'
                        },
                        {
                            xtype: 'textfield',
                            bind: {
                                value: '{troubleReport.answer}'
                            },
                            fieldLabel: 'Answer'
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
                                value: '{troubleReport.contactName}'
                            },
                            fieldLabel: 'Contact Name'
                        },
                        {
                            xtype: 'textfield',
                            bind: {
                                value: '{troubleReport.contactNumber}'
                            },
                            fieldLabel: 'Contact No.'
                        },
                        {
                            xtype: 'textfield',
                            bind: {
                                value: '{troubleReport.secondaryContactName}'
                            },
                            fieldLabel: 'Sec. Contact Name'
                        },
                        {
                            xtype: 'textfield',
                            bind: {
                                value: '{troubleReport.secondaryContactNumber}'
                            },
                            fieldLabel: 'Sec. Contact No.'
                        },
                        {
                            xtype: 'textfield',
                            bind: {
                                value: '{troubleReport.tempCallDiversionNumber}'
                            },
                            fieldLabel: 'Temp Call Diversion No.'
                        }
                    ]
                }
            ]
        }]
});