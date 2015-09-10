Ext.define('Spm.view.serviceproblem.clear.ClearServiceProblemDialog', {
    extend: 'Spm.component.StandardDialog',
    alias: 'widget.clearServiceProblemDialog',

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
                        labelWidth: 130
                    },
                    items: [
                        {
                            xtype: 'combobox',
                            fieldLabel: 'Fault',
                            displayField: 'description',
                            valueField: 'faultCode',
                            bind: {
                                value: '{fault}',
                                store: '{faults}'
                            },
                            typeAhead: true,
                            forceSelection: true,
                            allowBlank: false,
                            emptyText: 'Please select a Fault...',
                            queryMode: 'local',
                            listeners: {
                                select: 'onFaultSelected'
                            }
                        },
                        {
                            xtype: 'fieldcontainer',
                            layout: {
                                type: 'hbox'
                            },
                            align: 'left',
                            fieldLabel: 'Cause',
                            items: [
                                {
                                    xtype: 'combobox',
                                    reference: 'causeCombo',
                                    displayField: 'description',
                                    valueField: 'causeCode',
                                    bind: {
                                        value: '{cause}',
                                        store: '{causes}'
                                    },
                                    typeAhead: true,
                                    forceSelection: true,
                                    allowBlank: false,
                                    emptyText: 'Please select a Cause...',
                                    listeners: {
                                        select: 'onCauseSelected'
                                    },
                                    disabled: true,
                                    queryMode: 'local',
                                    flex: 1
                                }
                            ]
                        },
                        {
                            xtype: 'fieldcontainer',
                            layout: {
                                type: 'hbox'
                            },
                            align: 'left',
                            fieldLabel: 'Resolution Reason',
                            items: [
                                {
                                    xtype: 'combobox',
                                    reference: 'resolutionReasonCombo',
                                    displayField: 'description',
                                    valueField: 'resolutionReasonCode',
                                    bind: {
                                        value: '{resolutionReason}',
                                        store: '{resolutionReasons}'
                                    },
                                    typeAhead: true,
                                    forceSelection: true,
                                    allowBlank: false,
                                    emptyText: 'Please select a Resolution Reason...',
                                    disabled: true,
                                    queryMode: 'local',
                                    flex: 1
                                }
                            ]
                        }
                    ]
                }
            ]
        }]
});
