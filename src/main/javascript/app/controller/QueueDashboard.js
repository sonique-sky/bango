Ext.define('Spm.controller.QueueDashboard', {
    extend: 'Ext.app.Controller',
    alias: 'controller.queueDashboard',
    requires: ['Spm.view.queue.QueueDashboardTabContent'],

    refs: [
        { ref: 'tabPanel', selector: '#tab-panel' }
    ],

    init: function () {
        this.listen({
            controller: {
                '#Security': {
                    authenticated: this.onAuthenticated
                }
            }
        });
    },

    onAuthenticated: function (authenticatedAgent) {
        if(authenticatedAgent.hasPrivilege('ViewQueueDashboard')) {
            var tabPanel = this.getTabPanel();
            tabPanel.add(Ext.widget('queueDashboard'));
        }
    }
});