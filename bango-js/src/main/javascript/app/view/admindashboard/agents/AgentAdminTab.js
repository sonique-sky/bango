Ext.define('Spm.view.admindashboard.agents.AgentAdminTab', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.agentAdminTab',

    viewModel: {type: 'agentAdminTab'},

    title: 'Agents',
    iconCls: 'icon-admin-agents',


    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        defaults: {
            xtype: 'button',
            padding: '5,5,5,5'
        },
        items: [
            {
                tooltip: 'Reassign agent to another team',
                iconCls: 'icon-admin-agent-reassign',
                handler: 'foo'
            },
            {
                tooltip: 'Change agent\'s role',
                iconCls: 'icon-admin-agent-change-role',
                handler: 'foo'
            },
            {
                tooltip: 'Create new agent',
                iconCls: 'icon-admin-agent-create',
                handler: 'foo'
            },
            {
                tooltip: 'Delete Agent',
                iconCls: 'icon-admin-agent-delete',
                handler: 'foo'
            }
        ]
    }]
});