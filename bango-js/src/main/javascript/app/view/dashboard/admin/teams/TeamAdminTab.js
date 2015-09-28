Ext.define('Spm.view.dashboard.admin.teams.TeamAdminTab', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.teamAdminTab',
    itemId: 'teamAdmin',

    requires: [
        'Ext.toolbar.Paging',
        'Spm.view.dashboard.admin.teams.TeamAdminTabViewController',
        'Spm.view.dashboard.admin.teams.TeamAdminTabViewModel'
    ],

    mixins: {
        tab: 'Spm.view.component.mixins.RoutableTab'
    },

    parentTabId: 'adminDashboard',
    viewModel: {type:'teamAdminTab'},
    controller: 'teamAdminTab',

    listeners: {
        activate: 'loadTeamsStore'
    },

    bind: {
        store: '{teams}'
    },

    title: 'Teams',
    iconCls: 'icon-admin-teams',
    border: 0,

    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            defaults: {
                xtype: 'button',
                padding: '5,5,5,5'
            },
            items: [
                {
                    tooltip: 'Assign Queues to this Team',
                    iconCls: 'icon-admin-teams-edit',
                    handler: 'assignQueuesToTeam'
                },
                {
                    tooltip: 'Create a Team',
                    iconCls: 'icon-admin-teams-create',
                    handler: 'createNewTeam'
                },
                {
                    tooltip: 'Delete a Team',
                    iconCls: 'icon-admin-teams-delete',
                    handler: 'deleteTeam'
                },
                {xtype: 'tbspacer'},
                {
                    xtype: 'pagingtoolbar',
                    border: 0,
                    bind: {
                        store: '{teams}'
                    }
                }
            ]
        }
    ],

    columns: [
        {text: 'Name', width: '100%', dataIndex: 'name'}
    ]
});
