Ext.define('Spm.controller.MyQueues', {
    extend: 'Ext.app.Controller',
    alias: 'controller.myQueues',

    stores: [
         'AgentQueues'
    ],

    refs: [
        {
            ref: 'queuesView',
            selector: '#my-queues-view'
        },
        {
            ref: 'myQueuesPanel',
            selector: 'myQueuesPanel'
        }
    ],

    init: function () {
        this.listen({
            controller: {
                '#Security': {
                    authenticated: this.onAuthenticated
                },
                '#Queues' : {
                    queueTabSelected: this.onQueueTabSelected,
                    queueTabDeselected: this.onQueueTabDeselected
                }
            },
            component: {
                "#my-queues-view": {
                    select: this.onQueueSelect
                }
            }
        });
    },

    onAuthenticated: function(authenticatedAgent) {
        this.getMyQueuesPanel().setVisible(authenticatedAgent.hasPrivilege('HasAssignedQueues'));
    },

    onQueueSelect: function (dataviewmodel, record) {
        this.fireEvent('queueSelected', record);
    },

    onQueueTabSelected: function(queueTabContent) {
        var queueIndex = this.getAgentQueuesStore().indexOf(queueTabContent.getQueue());

        this.getQueuesView().getSelectionModel().select(queueIndex, false, true);
    },

    onQueueTabDeselected: function() {
        this.getQueuesView().getSelectionModel().deselectAll(true);
    }
});
