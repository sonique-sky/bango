Ext.define('Spm.view.navigation.queues.QueuesViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.myQueues',

    listen: {
        controller: {
            'superman': {
                authenticated: 'onAuthenticated'
            },
            'queueTab': {
                queueTabSelected: 'onQueueTabSelected',
                queueTabDeselected: 'onQueueTabDeselected',
                queueTabClosed: 'onQueueTabClosed'
            }
        }
    },

    onAgentQueueSelect: function (dataViewModel, selectedQueue) {
        this.fireEvent('agentQueueSelected', selectedQueue);
    },

    onAuthenticated: function (authenticatedAgent) {
        var hasAssignedQueues = authenticatedAgent.hasPrivilege('HasAssignedQueues');
        this.getView().setVisible(hasAssignedQueues);

        if (hasAssignedQueues) {
            var agentQueues = authenticatedAgent.getTeam().assignedQueues();
            this.getViewModel().set('agentQueues', agentQueues);
        }
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
