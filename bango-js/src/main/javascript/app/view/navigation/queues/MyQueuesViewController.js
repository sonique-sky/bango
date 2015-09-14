Ext.define('Spm.view.navigation.queues.MyQueuesViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.myQueues',

    listen: {
        controller: {
            'queueTab': {
                queueTabSelected: 'onQueueTabSelected',
                queueTabDeselected: 'onQueueTabDeselected',
                queueTabClosed: 'onQueueTabClosed'
            }
        }
    },

    loadQueues: function () {
        var agent = this.getViewModel().get('authenticatedAgent');
        this.getStore('agentQueues').loadData(agent.getTeam().assignedQueues());
    },

    onAgentQueueSelect: function (dataViewModel, selectedQueue) {
        this.fireEvent('agentQueueSelected', selectedQueue);
    },

    onQueueTabSelected: function (queueId) {
        var dataView = this.lookupReference('myQueuesDataView');
        var agentQueues = this.getViewModel().get('agentQueues');
        var index = agentQueues.indexOfId(queueId);

        dataView.getSelectionModel().select(index, false, true);
    },

    onQueueTabClosed: function (queueId) {
        var dataView = this.lookupReference('myQueuesDataView');
        var agentQueues = this.getViewModel().get('agentQueues');
        var index = agentQueues.indexOfId(queueId);

        dataView.getSelectionModel().deselect(index, true);
    },

    onQueueTabDeselected: function () {
        var dataView = this.lookupReference('myQueuesDataView');
        var agentQueues = this.getViewModel().get('agentQueues');

        dataView.getSelectionModel().deselectAll(true);
    }
});
