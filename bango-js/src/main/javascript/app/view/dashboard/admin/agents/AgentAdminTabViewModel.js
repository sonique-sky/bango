Ext.define('Spm.view.dashboard.admin.agents.AgentAdminTabViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.agentAdminTab',

    stores: {
        agents: {
            type: 'agents',
            pageSize: 0,
            listeners: {
                load: 'onAgentStoreLoaded'
            },
            grouper: {
                groupFn: function (item) {
                    var team = item.get('team');

                    return Ext.Object.isEmpty(team) ? 'No Team' : team.name;
                }
            }
        }
    }
});
