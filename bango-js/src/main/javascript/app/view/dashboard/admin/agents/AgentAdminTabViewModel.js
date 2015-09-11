Ext.define('Spm.view.dashboard.admin.agents.AgentAdminTabViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.agentAdminTab',

    data: {
        agent: null
    },

    stores: {
        agents: {
            type: 'agents',
            pageSize: 0,
            listeners: {
                load: 'onAgentStoreLoaded'
            },
            autoLoad: true,
            grouper: {
                groupFn: function (item) {
                    var team = item.get('team');

                    return Ext.Object.isEmpty(team) ? 'No Team' : team.name;
                }
            }
        }
    },

    formulas: {
        isLoggedInAgent: {
            bind: '{agent}',
            get: function (agent) {
                return agent !== null && agent.authorisedUid === this.authenticatedAgent().authorisedUid;
            }
        }
    },

    authenticatedAgent: function () {
        return this.get('authenticatedAgent').getData();
    },

    agent: function () {
        return this.get('agent');
    }
});
