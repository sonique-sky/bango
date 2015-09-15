Ext.define('Spm.view.serviceproblem.reassign.ReassignServiceProblemDialogViewController', {
    extend: 'Spm.component.StandardDialogViewController',
    alias: 'controller.reassignServiceProblemDialog',

    onShow: function () {
        var currentAgentCode = this.getViewModel().get('authenticatedAgent.agentCode');
        var queueId = this.getViewModel().get('serviceProblem.queue.queueId');

        var agentsStore = this.getViewModel().getStore('agents');
        agentsStore.filter([
            {
                property: 'excludeAgent',
                value: currentAgentCode
            },
            {
                property: 'watchingQueue',
                value: queueId
            },
            {
                property: 'notOffline',
                value: true
            }
        ]);

        agentsStore.load();
    },

    storeLoad: function (store) {
        var first = store.first();
        if (first) {
            this.lookupReference('agentsGrid').setSelection(first);
            this.getViewModel().set('acceptButtonDefaultDisabled', false);
        }
    },

    onAccept: function () {
        var viewModel = this.getViewModel();
        Ext.Ajax.request(
            {
                scope: this,
                url: Ext.String.format('api/serviceProblem/{0}/reassign', viewModel.serviceProblemId()),
                method: 'PUT',
                jsonData: {
                    agentCode: this.selectedAgent().agentCode()
                },
                success: function () {
                    this.fireEvent('serviceProblemReassigned', viewModel.serviceProblemId());
                    this.closeView();
                }
            }
        );
    },

    selectedAgent: function () {
        return this.lookupReference('agentsGrid').getSelectionModel().getSelection()[0];
    }

});
