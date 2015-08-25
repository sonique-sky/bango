Ext.define('Spm.view.serviceproblem.ServiceProblemTab', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.serviceProblemTab',

    border: 0,

    closable: true,
    iconCls: 'icon-sp-unassigned',

    viewModel: {type: 'serviceProblemTab'},
    controller: 'serviceProblemTab',

    listeners: {
        staleData: 'onStaleData',
        //activate: 'onQueueTabActivated',
        //deactivate: 'onQueueTabDeactivated',
        close: 'onServiceProblemTabClosed',
        added: 'onServiceProblemTabAdded'
    },

    bind: {
        title: '{serviceProblemTabTitle}'
    },

    layout: 'card',

    dockedItems: [
        {
            xtype: 'container',
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            dock: 'top',
            defaults: {
                border: 0
            },
            items: [
                {
                    xtype: 'toolbar',
                    items: [
                        {
                            xtype: 'buttongroup',
                            title: 'View',
                            defaults: {
                                xtype: 'button',
                                toggleGroup: 'panelToggle',
                                allowDepress: false,
                                padding: '5,5,5,5'
                                //handler: me.switchView,
                            },
                            items: [
                                {
                                    text: 'Service Problem',
                                    itemId: 'serviceProblem',
                                    pressed: true
                                },
                                {
                                    text: 'Trouble Report',
                                    itemId: 'troubleReport'
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'toolbar',
                    items: [
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
                                    handler: 'onRefreshServiceProblem'
                                },
                                {
                                    reference: 'serviceProblemPullButton',
                                    iconCls: 'icon-pull',
                                    tooltip: 'Pull this item',
                                    handler: 'onPullServiceProblem',
                                    bind: {
                                        disabled: '{pullServiceProblemButtonDisabled}'
                                    }
                                },
                                {
                                    iconCls: 'icon-hold',
                                    tooltip: 'Hold this Service Problem',
                                    handler: 'onToggleHoldServiceProblemFromTab',
                                    bind: {
                                        iconCls: '{toggleHoldIconCls}',
                                        disabled: '{!serviceProblemOwned}'
                                    }
                                },
                                {
                                    iconCls: 'icon-reassign',
                                    tooltip: 'Reassign service problem to another agent',
                                    bind: {
                                        disabled: '{!serviceProblemOwned}'
                                    }
                                },
                                {
                                    iconCls: 'icon-transfer',
                                    tooltip: 'Transfer to another queue',
                                    bind: {
                                        disabled: '{!serviceProblemOwned}'
                                    }
                                },
                                {
                                    iconCls: 'icon-clear',
                                    tooltip: 'Clear this service problem',
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
                                    bind: {
                                        disabled: '{!serviceProblemOwned}'
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
                                    bind: {
                                        disabled: '{!serviceProblemOwned}'
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'toolbar',
                    items: [
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
                                        disabled: '{!serviceProblemOwned}'
                                    }
                                },
                                {
                                    iconCls: 'icon-amend-trouble-report',
                                    tooltip: 'Amend Trouble Report',
                                    bind: {
                                        disabled: '{!serviceProblemOwned}'
                                    }
                                },
                                {
                                    iconCls: 'icon-cancel-trouble-report',
                                    tooltip: 'Cancel Trouble Report',
                                    bind: {
                                        disabled: '{!serviceProblemOwned}'
                                    }
                                },
                                {
                                    iconCls: 'icon-confirm-equipment-disconnect',
                                    tooltip: 'Confirm Equipment is Disconnected',
                                    bind: {
                                        disabled: '{!serviceProblemOwned}'
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'toolbar',
                    items: [
                        {
                            xtype: 'buttongroup',
                            title: 'Work Item',
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
                                    }
                                }
                            ]
                        }

                    ]
                },
                {
                    xtype: 'toolbar',
                    items: [
                        {
                            xtype: 'buttongroup',
                            title: 'External Links',
                            defaults: {
                                xtype: 'button',
                                padding: '5,5,5,5'
                            },
                            items: [
                                {
                                    iconCls: 'icon-av',
                                    tooltip: 'Do AV awesomeness!',
                                    bind: {
                                        disabled: '{!serviceProblemOwned}'
                                    }
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ],
    items: [
        {
            xtype: 'container',
            layout: {type: 'vbox', align: 'stretch'},
            itemId: 'serviceProblemPanel',
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
            xtype: 'form',
            itemId: 'troubleReportPanel',
            items: [
                {
                    xtype: 'label',
                    text: 'Trouble Report'
                }
            ]
        }
    ]
})
;