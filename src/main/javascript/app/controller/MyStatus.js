Ext.define('Spm.controller.MyStatus', {
    extend: 'Ext.app.Controller',
    alias: 'controller.myStatus',

    models: [
        'Agent'
    ],
    stores: [
        'AuthenticatedAgent',
        'AgentQueues'
    ],
    views: [
        'navigation.AgentStatusPanel'
    ],

    refs: [
        {
            ref: 'agentStatusPanel',
            selector: 'agentStatusPanel',
            xtype: 'agentStatusPanel'
        }
    ],

    onToggleAvailability: function () {
        var me = this;

        Ext.Ajax.request({
            method: 'POST',
            url: 'api/agent/toggleAvailability',
            success: function (response) {
                me.getAuthenticatedAgentStore().loadRawData(response);
            }
        });
    },

    init: function (application) {
        this.listen({
            component: {
                'button#toggle-button': {
                    click: this.onToggleAvailability
                }
            }
        });
    }
});