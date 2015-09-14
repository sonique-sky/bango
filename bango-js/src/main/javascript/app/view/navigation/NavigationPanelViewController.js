Ext.define('Spm.view.navigation.NavigationPanelViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.navigationPanel',

    requires: [
        'Spm.view.navigation.queues.MyQueues'
    ],

    insertMyQueuesPanelIfRequired: function () {
        var authenticatedAgent = this.getViewModel().get('authenticatedAgent');

        if (authenticatedAgent.hasPrivilege('HasAssignedQueues')) {
            this.getView().insert(1, Ext.create('Spm.view.navigation.queues.MyQueues'));
        }
    }
});