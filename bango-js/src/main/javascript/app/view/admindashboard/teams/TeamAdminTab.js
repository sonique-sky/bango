Ext.define('Spm.view.admindashboard.teams.TeamAdminTab', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.teamAdminTab',

    require: [
        'Spm.view.admindashboard.teams.TeamAdminTabViewModel'
    ],

    viewModel: 'teamAdminTab',
    controller: 'teamAdminTab',

    title: 'Teams',
    iconCls: 'icon-admin-teams',

    listeners: {
        activate: 'onActivated'
    },

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
                }
            ]
        }
    ],

    items: [
        {
            border: 0,
            xtype: 'gridpanel',
            reference: 'teamGrid',
            bind: {
                store: '{teams}'
            },

            columns: [
                {
                    text: 'Name',
                    width: '100%',
                    dataIndex: 'name'
                }
            ]
        }
    ]
});