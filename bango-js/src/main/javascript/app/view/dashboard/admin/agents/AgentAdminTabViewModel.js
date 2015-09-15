Ext.define('Spm.view.dashboard.admin.agents.AgentAdminTabViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.agentAdminTab',

    requires: [
        'Spm.store.Agents'
    ],

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

    authenticatedAgent: function () {
        return this.get('authenticatedAgent');
    }

});
