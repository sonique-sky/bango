Ext.define('Spm.view.dashboard.msp.MspDashboardTab', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.mspDashboard',
    itemId: 'mspDashboard',

    requires: [
        'Ext.button.Button',
        'Ext.form.field.Checkbox',
        'Ext.grid.Panel',
        'Ext.toolbar.Separator',
        'Ext.toolbar.Spacer',
        'Spm.view.component.AutoRefreshToolbar',
        'Spm.view.dashboard.msp.MspDashboardTabController',
        'Spm.view.dashboard.msp.MspDashboardTabModel',
        'Spm.view.serviceproblem.eventhistory.EventHistoryPanel'
        'Spm.view.dashboard.msp.MspDashboardTabController',
        'Spm.view.dashboard.msp.MspDashboardTabModel'
    ],

    mixins: {
        tab: 'Spm.view.component.mixins.RoutableTab'
    },

    controller: 'mspDashboard',
    viewModel: {type: 'mspDashboard'},

    listeners: {
        activate: 'loadMspStore'
    },

    title: 'MSP Dashboard',
    iconCls: 'icon-msp-dashboard',
    closable: false,

    items: [
        {
            xtype: 'gridpanel',
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
                            padding: '5,5,5,5'
                        },
                        {
                            xtype: 'button',
                            iconCls: 'icon-close-msp',
                            toolTip: 'Close MSP',
                            padding: '5,5,5,5'
                        },
                        {
                            xtype: 'button',
                            iconCls: 'icon-view-msp-sps',
                            toolTip: 'View Service Problems associated to the selected MSP',
                            padding: '5,5,5,5'
                        },
                        "-",
                        {
                            xtype: 'checkbox',
                            boxLabel: 'Show Recently Closed',
                            handler: 'showRecentlyClosed'
                        },
                        " ",
                        "-",
                        {
                            xtype: 'checkbox',
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
})
;
