Ext.define('Spm.view.dashboard.admin.agents.reassign.ReassignAgentDialog', {
    extend: 'Spm.component.StandardDialog',
    alias: 'widget.reassignAgentDialog',

    requires: [
        'Spm.view.dashboard.admin.agents.reassign.ReassignAgentDialogViewController',
        'Spm.view.dashboard.admin.agents.reassign.ReassignAgentDialogViewModel'
    ],

    viewModel: 'reassignAgentDialog',
    controller: 'reassignAgentDialog',

    bind: {
        title: 'Reassign Agent :: {agent.agentCode}'
    },
    iconCls: 'icon-admin-agent-reassign',
    width: 350,
    height: 220,

    listeners: {
        show: 'onShow'
    },

    items: [
        {
            xtype: 'gridpanel',
            rowLines: false,
            reference: 'teamsGrid',
            height: 135,
            border: false,
            hideHeaders: true,
            bind: {
                store: '{teams}'
            },
            columns: [
                {dataIndex: 'name', flex: 1}
            ]
        }
    ]

})
;