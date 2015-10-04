Ext.define('Spm.view.serviceproblem.clear.ClearServiceProblemDialog', {
    extend: 'Spm.component.StandardDialog',
    alias: 'widget.clearServiceProblemDialog',

    requires: [
        'Ext.form.FieldContainer',
        'Ext.form.Panel',
        'Ext.form.field.ComboBox',
        'Ext.layout.container.VBox',
        'Spm.view.serviceproblem.clear.ClearServiceProblemDialogViewController',
        'Spm.view.serviceproblem.clear.ClearServiceProblemDialogViewModel'
    ],

    viewModel: {type: 'clearServiceProblemDialog'},
    controller: 'clearServiceProblemDialog',

    title: 'Clear Service Problem',

    height: 180,
    width: 650,

    listeners: {
        show: 'onShow'
    },

    items: [
        {
            xtype: 'form',
            bodyPadding: 10,
            reference: 'clearServiceProblemForm',
            listeners: {
                validitychange: 'onValidityChange'
            },
            items: [
                {
                    xtype: 'fieldcontainer',
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    defaults: {
                        xtype: 'combobox',
                        labelWidth: 130,
                        typeAhead: true,
                        forceSelection: true,
                        allowBlank: false,
                        queryMode: 'local',
                        displayField: 'description'
                    },
                    items: [
                        {
                            fieldLabel: 'Fault',
                            valueField: 'faultCode',
                            bind: {
                                value: '{fault}',
                                store: '{faults}'
                            },
                            emptyText: 'Please select a Fault...',
                            listeners: {
                                select: 'onFaultSelected'
                            }
                        },
                        {
                            fieldLabel: 'Cause',
                            reference: 'causeCombo',
                            valueField: 'causeCode',
                            bind: {
                                value: '{cause}',
                                store: '{causes}',
                                disabled: '{causeComboDisabled}'
                            },
                            emptyText: 'Please select a Cause...',
                            listeners: {
                                select: 'onCauseSelected'
                            }
                        },
                        {
                            fieldLabel: 'Resolution Reason',
                            reference: 'resolutionReasonCombo',
                            valueField: 'resolutionReasonCode',
                            bind: {
                                value: '{resolutionReason}',
                                store: '{resolutionReasons}',
                                disabled: '{resolutionReasonComboDisabled}'
                            },
                            emptyText: 'Please select a Resolution Reason...'
                        }
                    ]
                }
            ]
        }
    ]

});
