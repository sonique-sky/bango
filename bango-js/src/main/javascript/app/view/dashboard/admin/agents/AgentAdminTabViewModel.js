Ext.define('Spm.view.dashboard.admin.agents.AgentAdminTabViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.agentAdminTab',

    stores: {
        agents: {
            type: 'agents',
            remoteSort: true,
            listeners: {
                load: 'selectFirstAgentStoreRow'
            },
            grouper: {
                property: 'teamName',
                groupFn: function (item) {
                    var team = item.get('team');
                    return Ext.Object.isEmpty(team) ? 'No Team' : team.name;
                }
            }
        }
    },

    authenticatedAgent: function () {
        return this.get('authenticatedAgent');
    }

})
;
