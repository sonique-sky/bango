Ext.define('Spm.view.troublereport.requestappointment.RequestAppointmentDialog', {
    extend: 'Spm.component.StandardDialog',
    alias: 'widget.requestAppointmentDialog',

    viewModel: {type: 'requestAppointmentDialog'},
    controller: 'requestAppointmentDialog',

    title: 'Request Appointment',
    iconCls: 'icon-create-trouble-report',

    height: 422,
    width: 396,

    items: [
        {
            xtype: 'form',
            bodyPadding: 10,
            listeners: {
                validitychange: 'onValidityChange'
            },
            reference: 'requestAppointmentForm',
            items: [
                {
                    xtype: 'fieldcontainer',
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'fieldcontainer',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'combobox',
                                    fieldLabel: 'Repair Type',
                                    bind: {
                                        value: '{appointment.type}'
                                    },
                                    margin: '5 0 0 0',
                                    labelWidth: 160,
                                    reference: 'repairType',
                                    displayField: 'repairType',
                                    valueField: 'repairType',
                                    store: {
                                        fields: ['repairType'],
                                        data: [
                                            ['Standard Repair'],
                                            ['SFI Repair']
                                        ]
                                    },
                                    allowBlank: false,
                                    typeAhead: true,
                                    forceSelection: true,
                                },
                                {
                                    xtype: 'datefield',
                                    fieldLabel: 'Appointment Start Date',
                                    bind: {
                                        value: '{appointment.date}'
                                    },
                                    allowBlank: false,
                                    format: 'd/m/Y',
                                    formatText: null,
                                    minValue: new Date(),
                                    margin: '5 0 0 0',
                                    labelWidth: 160
                                }
                            ]
                        },
                        {
                            xtype: 'fieldcontainer',
                            layout: {
                                type: 'vbox',
                                align: 'right'
                            },
                            items: [
                                {
                                    xtype: 'button',
                                    text: 'Fetch Appointments',
                                    margin: '15 0 0 0',
                                    handler: 'onFetchAppointments'
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            height: 87,
                            items: [
                                {
                                    xtype: 'label',
                                    cls: 'no-work-item-text',
                                    text: 'Please enter earliest date and fetch appointments'
                                }
                            ]
                        }
                    ]
                }]
        }
    ]
});