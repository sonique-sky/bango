Ext.define('Spm.view.dashboard.msp.MspDashboardTab', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.mspDashboard',

    requires: [
        'Ext.button.Button',
        'Ext.form.field.Checkbox',
        'Ext.grid.Panel',
        'Ext.toolbar.Separator',
        'Ext.toolbar.Spacer',
        'Spm.view.component.autorefresh.AutoRefreshToolbar',
        'Spm.view.dashboard.msp.MspDashboardTabViewController',
        'Spm.view.dashboard.msp.MspDashboardTabViewModel',
        'Spm.view.serviceproblem.eventhistory.EventHistoryPanel'
    ],

    controller: 'mspDashboard',
    viewModel: {type: 'mspDashboard'},

    listeners: {
        activate: 'loadStore'
    },

    title: 'MSP Dashboard',
    iconCls: 'icon-msp-dashboard',
    closable: false,

    items: [
        {
            xtype: 'gridpanel',
            reference: 'mspGridPanel',
            bind: {
                store: '{mspDashboardEntries}'
            },

            height: 200,

            listeners: {
                cellclick: 'selectMajorServiceProblem'
            },

            dockedItems: [
                {
                    xtype: 'autorefreshtoolbar',
                    prependButtons: false,
                    bind: {
                        store: '{mspDashboardEntries}'
                    },

                    items: [
                        "-",
                        {
                            xtype: 'button',
                            iconCls: 'icon-create-msp',
                            toolTip: 'Create MSP',
                            padding: '5,5,5,5',
                            handler: 'createMsp'
                        },
                        {
                            xtype: 'button',
                            iconCls: 'icon-close-msp',
                            toolTip: 'Close MSP',
                            padding: '5,5,5,5',
                            handler: 'closeMsp',
                            bind: {
                                disabled: '{closeButtonDisabled}'
                            }
                        },
                        {
                            xtype: 'button',
                            iconCls: 'icon-view-msp-sps',
                            toolTip: 'View Service Problems associated to the selected MSP',
                            padding: '5,5,5,5',
                            handler: 'viewAssociatedServiceProblems'
                        },
                        "-",
                        {
                            xtype: 'checkbox',
                            reference: 'showRecentlyClosed',
                            boxLabel: 'Show Recently Closed',
                            handler: 'showRecentlyClosed'
                        },
                        " ",
                        "-",
                        {
                            xtype: 'checkbox',
                            reference: 'hideManuallyCreated',
                            boxLabel: 'Hide Manually Created',
                            handler: 'hideManuallyCreated'
                        }
                    ]
                }
            ],

            columns: {
                defaults: {
                    flex: 1
                },
                items: [
                    {text: 'Id', dataIndex: 'id'},
                    {text: 'Description', dataIndex: 'description'},
                    {text: 'Outage Id', dataIndex: 'outageId'},
                    {text: 'Start Date', dataIndex: 'startDate'},
                    {text: 'Expected Resolution Date', dataIndex: 'expectedResolutionDate'},
                    {text: '# of Services', dataIndex: 'serviceCount', bind: {hidden: '{displayRecentlyClosed}'}},
                    {text: '# of SPs', dataIndex: 'serviceProblemCount', bind: {hidden: '{displayRecentlyClosed}'}},
                    {text: 'Closed Date', dataIndex: 'closedDate', bind: {hidden: '{!displayRecentlyClosed}'}}
                ]
            }
        },

        {
            xtype: 'eventHistoryPanel'
        }
    ]

});
