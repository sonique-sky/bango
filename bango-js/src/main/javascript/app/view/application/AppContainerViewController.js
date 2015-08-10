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
        var viewModel = this.getViewModel();
        var queueId = selectedQueue.queueId();

        if(!viewModel.containsQueueTabForId(queueId)) {
            var tabPanel = this.lookupReference('tabPanel');
            tabPanel.add({
                xtype: 'queueTabContent',
                title: 'Queue :: '+queueId
            });

            viewModel.addQueueTab(queueId);
        }

        this.fireEvent('queueTabSelected', queueId);
    }

});