Ext.define('Spm.controller.QueueDashboard', {
    extend: 'Ext.app.Controller',
    alias: 'controller.queueDashboard',
    requires: ['Spm.view.queuedashboard.QueueDashboardTabContent'],

    refs: [
        { ref: 'tabPanel', selector: '#tab-panel' }
    ],

    mixins: [
        'Spm.controller.mixins.ActionContextManager'
    ],

    init: function () {
        this.listen({
            controller: {
                '#Security': {
                    authenticated: this.onAuthenticated,
                    loggedOut: this.onLoggedOut
                }
            }
        });
    },

    onAuthenticated: function (authenticatedAgent) {
        if (authenticatedAgent.hasPrivilege('ViewQueueDashboard')) {
            this.queueDashboard = Ext.widget('queueDashboard', {actionContextManager: this});
            var tabPanel = this.getTabPanel();
            tabPanel.add(this.queueDashboard);
        }
    },

    onLoggedOut: function () {
        if (this.queueDashboard) {
            var tabPanel = this.getTabPanel();
            tabPanel.remove(this.queueDashboard);
        }
    }
});