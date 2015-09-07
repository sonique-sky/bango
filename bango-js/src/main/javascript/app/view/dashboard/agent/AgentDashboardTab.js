Ext.define('Spm.view.dashboard.agent.AgentDashboardTab', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.agentDashboard',

    viewModel: 'agentDashboard',
    controller: 'agentDashboard',

    require: [
        'Spm.view.component.AutoRefreshToolbar'
    ],

    listeners: {
        activate: 'loadStore'
    },

    bind: {
        store: '{agents}'
    },

    title: 'Agent Dashboard',
    iconCls: 'icon-agent-dashboard',
    closable: false,

    dockedItems: [
        {
            xtype: 'autorefreshtoolbar',
            border: 0,
            bind: {
                store: '{agents}'
            }
        }
    ],

    columns: [
        {text: 'Username', dataIndex: 'displayName'},
        {text: 'Status', dataIndex: 'agentAvailability'},
        {text: '# Assigned Items'},
        {
            text: 'Duration (Minutes)',
            dataIndex: 'availabilityChangeTime',
            renderer: function (timeChange) {
                if (Ext.Object.isEmpty(timeChange)) {
                    return 'N/A';
                } else {
                    var date = Ext.Date.parse(timeChange, 'd/m/Y H:i:s');
                    var now = new Date();
                    if (Ext.Date.isDST(now)) { //TODO: Superman should stop using java.util.Date
                        date = Ext.Date.add(date, Ext.Date.HOUR, 1);
                    }
                    return Ext.Date.diff(date, now, Ext.Date.MINUTE);
                }

            }
        }
    ]
});
