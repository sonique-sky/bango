Ext.define('Spm.view.serviceproblem.ServiceProblemTab', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.serviceProblemTab',

    viewModel: {type: 'serviceProblemTab'},
    controller: 'serviceProblemTab',

    listeners: {
        staleData: 'loadServiceProblem',
        close: 'onServiceProblemTabClosed',
        added: 'onServiceProblemTabAdded',
        show: 'onServiceProblemTabActivated'
    },

    bind: {
        iconCls: '{assignedStateIconClass}',
        title: '{serviceProblemTabTitle}'
    },

    layout: 'card',
    border: 0,
    closable: true,

    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                {
                    xtype: 'buttongroup',
                    title: 'View',
                    defaults: {
                        xtype: 'button',
                        toggleGroup: 'panelToggle',
                        padding: '5,5,5,5',
                        enableToggle: true
                    },
                    items: [
                        {
                            text: 'Service Problem',
                            reference: 'serviceProblemButton',
                            handler: 'showServiceProblemPanel',
                            pressed: true
                        },
                        {
                            text: 'Trouble Report',
                            reference: 'troubleReportButton',
                            handler: 'showTroubleReportPanel'
                        }
                    ]
                },
                {
                    xtype: 'buttongroup',
                    title: 'Service Problem',
                    defaults: {
                        xtype: 'button',
                        padding: '5,5,5,5'
                    },
                    items: [
                        {
                            iconCls: 'icon-refresh',
                            tooltip: 'Refresh',
                            handler: 'loadServiceProblem'
                        },
                        {
                            iconCls: 'icon-pull',
                            tooltip: 'Pull this item',
                            handler: 'onPullServiceProblem',
                            bind: {
                                disabled: '{pullServiceProblemButtonDisabled}'
                            }
                        },
                        {
                            handler: 'onToggleHoldServiceProblem',
                            bind: {
                                tooltip: '{toggleHoldData.tooltip}',
                                iconCls: '{toggleHoldData.iconCls}',
                                disabled: '{!serviceProblemOwned}'
                            }
                        },
                        {
                            iconCls: 'icon-reassign',
                            tooltip: 'Reassign service problem to another agent',
                            handler: 'onReassignServiceProblem',
                            bind: {
                                disabled: '{!serviceProblemOwned}'
                            }
                        },
                        {
                            iconCls: 'icon-transfer',
                            tooltip: 'Transfer to another queue',
                            handler: 'onTransferServiceProblem',
                            bind: {
                                disabled: '{!serviceProblemOwned}'
                            }
                        },
                        {
                            iconCls: 'icon-clear',
                            tooltip: 'Clear this service problem',
                            handler: 'clearServiceProblem',
                            bind: {
                                disabled: '{!serviceProblemOwned}'
                            }
                        },
                        {
                            iconCls: 'icon-line-test',
                            tooltip: 'Request a managed line test',
                            bind: {
                                disabled: '{!serviceProblemOwned}'
                            }
                        },
                        {
                            iconCls: 'icon-feature-check',
                            tooltip: 'Request a feature check for this service',
                            handler: 'requestFeatureCheck',
                            bind: {
                                disabled: '{!canRequestFeatureCheck}'
                            }
                        },
                        {
                            iconCls: 'icon-work-reminder',
                            tooltip: 'Set a work reminder',
                            handler: 'onSetWorkReminder',
                            bind: {
                                disabled: '{!serviceProblemOwned}'
                            }
                        },
                        {
                            iconCls: 'icon-associate-msp',
                            tooltip: 'Associate this service problem to a MSP',
                            handler: 'associateToMsp',
                            bind: {
                                disabled: '{!serviceProblemOwned}'
                            }
                        }
                    ]
                },
                {
                    xtype: 'buttongroup',
                    title: 'Trouble Report',
                    defaults: {
                        xtype: 'button',
                        padding: '5,5,5,5'
                    },
                    items: [
                        {
                            iconCls: 'icon-create-trouble-report',
                            tooltip: 'Create Trouble Report',
                            handler: 'onCreateTroubleReport',
                            bind: {
                                disabled: '{!canRaiseTroubleReport}'
                            }
                        },
                        {
                            iconCls: 'icon-amend-trouble-report',
                            tooltip: 'Amend Trouble Report',
                            handler: 'onAmendTroubleReport',
                            bind: {
                                disabled: '{!canAmendTroubleReport}'
                            }
                        },
                        {
                            iconCls: 'icon-cancel-trouble-report',
                            tooltip: 'Cancel Trouble Report',
                            handler: 'onCancelTroubleReport',
                            bind: {
                                disabled: '{!canCancelTroubleReport}'
                            }
                        },
                        {
                            iconCls: 'icon-confirm-equipment-disconnect',
                            tooltip: 'Confirm Equipment is Disconnected',
                            handler: 'onConfirmEquipmentIsDisconnected',
                            bind: {
                                disabled: '{!canConfirmEquipmentIsDisconnected}'
                            }
                        }
                    ]
                },
                {
                    xtype: 'buttongroup',
                    title: 'Work Item',
                    width: 75,
                    defaults: {
                        xtype: 'button',
                        padding: '5,5,5,5'
                    },
                    items: [
                        {
                            iconCls: 'icon-next-work-item',
                            tooltip: 'Select Next Work Item',
                            bind: {
                                disabled: '{!serviceProblemOwned}'
                            },
                            handler: 'onSelectNextWorkItem'
                        }
                    ]
                },
                {
                    xtype: 'buttongroup',
                    title: 'External Links',
                    width: 75,
                    defaults: {
                        xtype: 'button',
                        padding: '5,5,5,5'
                    },
                    items: [
                        {
                            iconCls: 'icon-av',
                            tooltip: 'Assurance View',
                            bind: {
                                href: "{serviceProblem.assuranceViewUri}"
                            }
                        }
                    ]
                }
            ]
        }
    ],
    items: [
        {
            layout: 'card',
            reference: 'servicePanel',
            items: [
                {
                    xtype: 'container',
                    layout: {type: 'vbox', align: 'stretch'},
                    itemId: 'serviceProblemPanel',
                    reference: 'serviceProblemPanel',
                    items: [
                        {
                            xtype: 'workItemPanel'
                        },
                        {
                            xtype: 'serviceProblemPanel'
                        },
                        {
                            xtype: 'eventHistoryPanel'
                        }
                    ]
                },
                {
                    layout: 'card',
                    reference: 'troublePanel',
                    itemId: 'troubleReportPanel',
                    items: [
                        {
                            xtype: 'form',
                            itemId: 'hasNoTroubleReports',
                            cls: 'trouble-report-panel',
                            layout: {
                                align: 'stretch',
                                type: 'vbox'
                            },
                            defaults: {
                                layout: 'form',
                                defaults: {
                                    readOnly: true
                                }
                            },
                            items: [
                                {
                                    xtype: 'label',
                                    cls: 'no-work-item-text',
                                    text: 'No Trouble Reports exist for this Service Problem'
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            layout: {type: 'vbox', align: 'stretch'},
                            itemId: 'hasTroubleReports',
                            items: [
                                {
                                    xtype: 'troubleReportsPanel'
                                },
                                {
                                    xtype: 'troubleReportDetailsTab'
                                },
                                {
                                    xtype: 'troubleReportEventHistoryPanel'
                                }
                            ]
                        }
                    ]
                }
            ]
        }]
});
