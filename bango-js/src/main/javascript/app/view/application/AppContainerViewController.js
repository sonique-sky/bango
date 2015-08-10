Ext.define('Spm.view.application.AppContainerViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.appContainer',

    listen: {
        controller: {
            'myQueues' : {
                agentQueueSelected: 'onAgentQueueSelected'
            }
        }
    },

    onAgentQueueSelected: function(selectedQueue) {
        debugger;
    }

});