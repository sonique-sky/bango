Ext.define('Spm.view.dashboard.msp.create.CreateMspDialog', {
    extend: 'Spm.component.StandardDialog',
    alias: 'widget.createMspDialog',

    requires: [
        'Ext.form.FieldContainer',
        'Ext.form.Panel',
        'Ext.form.field.Date',
        'Ext.form.field.Text',
        'Ext.form.field.TextArea',
        'Ext.form.field.Time',
        'Spm.view.dashboard.msp.create.CreateMspDialogViewController',
        'Spm.view.dashboard.msp.create.CreateMspDialogViewModel'
    ],

    viewModel: {type: 'createMspDialog'},
    controller: 'createMspDialog',

    title: 'Create MSP',

    items: [
        {
            xtype: 'form',
            reference: 'createMspForm',
            listeners: {
                validitychange: 'onValidityChange'
            },
            items: [

                {
                    xtype: 'fieldcontainer',
                    padding: 10,
                    defaults: {
                        xtype: 'textfield',
                        labelWidth: 150,
                        allowBlank: false
                    },
                    items: [
                        {
                            itemId: 'description',
                            reference: 'mspDescription',
                            fieldLabel: 'MSP Description'
                        },
                        {
                            xtype: 'datefield',
                            itemId: 'startDate',
                            reference: 'mspStartDate',
                            fieldLabel: 'MSP Start Date',
                            format: 'd/m/Y',
                            altFormats: 'c'
                        },
                        {
                            xtype: 'timefield',
                            format: 'H:i',
                            itemId: 'startTime',
                            reference: 'mspStartTime',
                            fieldLabel: 'MSP Start Time'
                        },
                        {
                            xtype: 'datefield',
                            itemId: 'expectedResolutionDate',
                            reference: 'mspExpectedResolutionDate',
                            fieldLabel: 'MSP Expected Resolution Date',
                            format: 'd/m/Y',
                            altFormats: 'c',
                            allowBlank: true
                        },
                        {
                            xtype: 'textarea',
                            itemId: 'detailedNote',
                            reference: 'mspDetailedNote',
                            fieldLabel: 'MSP Detailed Note',
                            allowBlank: true
                        }
                    ]
                }
            ]
        }
    ]

});
