Ext.define('Spm.view.troublereport.requestappointment.RequestAppointmentDialog', {
    extend: 'Spm.component.StandardDialog',
    alias: 'widget.requestAppointmentDialog',

    requires: [
        'Ext.button.Button',
        'Ext.container.Container',
        'Ext.form.FieldContainer',
        'Ext.form.FieldContainer',
        'Ext.form.Label',
        'Ext.form.Panel',
        'Ext.form.field.ComboBox',
        'Ext.form.field.Date',
        'Ext.form.field.Radio',
        'Ext.grid.Panel',
        'Ext.grid.column.Date',
        'Ext.grid.column.Widget',
        'Ext.layout.container.Card',
        'Ext.layout.container.VBox',
        'Ext.layout.container.VBox'
    ],

    viewModel: {type: 'requestAppointmentDialog'},
    controller: 'requestAppointmentDialog',

    title: 'Request Appointment',
    iconCls: 'icon-create-trouble-report',

    height: 422,
    width: 396,
    listeners: {
        show: 'requestRepairTypes'
    },
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
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'combobox',
                                    fieldLabel: 'Repair Type',
                                    bind: {
                                        value: '{requestAppointment.type}',
                                        store: '{repairTypes}'
                                    },
                                    margin: '5 0 0 0',
                                    labelWidth: 160,
                                    reference: 'repairType',
                                    displayField: 'repairType',
                                    valueField: 'repairType',
                                    allowBlank: false,
                                    typeAhead: true,
                                    forceSelection: true,
                                    queryMode: 'local'
                                },
                                {
                                    xtype: 'datefield',
                                    fieldLabel: 'Appointment Start Date',
                                    bind: {
                                        value: '{requestAppointment.date}'
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
                            reference: 'appointment',
                            layout: {
                                type: 'card'
                            },
                            items: [
                                {
                                    xtype: 'container',
                                    reference: 'no-appointment-panel',
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
                                },
                                {
                                    xtype: 'gridpanel',
                                    itemId: 'available-appointment-grid',
                                    disableSelection: true,
                                    focusable: false,
                                    bind: {
                                        store: '{availableAppointments}'
                                    },
                                    height: 220,
                                    columns: [
                                        {
                                            text: 'Appointment Date',
                                            xtype: 'datecolumn',
                                            format: 'd/m/Y',
                                            flex: 0.6,
                                            dataIndex: 'appointmentDate'
                                        },
                                        {
                                            text: 'AM',
                                            xtype: 'widgetcolumn',
                                            flex: 0.2,
                                            widget: {
                                                xtype: 'radio',
                                                listeners: {
                                                    change: 'amAppointmentSelected'
                                                }
                                            },
                                            onWidgetAttach: function (column, widget, record) {
                                                widget.setDisabled(!record.get('amTimeslotAvailable'))
                                            }
                                        },
                                        {
                                            text: 'PM',
                                            xtype: 'widgetcolumn',
                                            flex: 0.2,
                                            widget: {
                                                xtype: 'radio',
                                                listeners: {
                                                    change: 'pmAppointmentSelected'
                                                }
                                            },
                                            onWidgetAttach: function (column, widget, record) {
                                                widget.setDisabled(!record.get('pmTimeslotAvailable'))
                                            }
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]

});
