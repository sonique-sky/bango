Ext.define('Spm.view.application.AppContainerViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.appContainer',

    listen: {
        controller: {
            'superman': {
                authenticated: 'onAuthenticated'
            },
            'myQueues': {
                agentQueueSelected: 'onAgentQueueSelected'
            },
            'queueTab': {
                queueTabClosed: 'onQueueTabClosed',
                serviceProblemSelected: 'onServiceProblemSelected'
            }
        }
    },

    onAuthenticated: function (authenticatedAgent) {
        var tabPanel = this.lookupReference('tabPanel');
        tabPanel.removeAll(true);
        this.getViewModel().clearActiveTabs();

        if (authenticatedAgent.hasPrivilege('AccessAdminDashboard')) {
            tabPanel.add(Ext.create('widget.adminDashboardTab'));
        }
    },

    onServiceProblemSelected: function (serviceProblemId) {
        var tabPanel = this.lookupReference('tabPanel');
        var viewModel = this.getViewModel();
        var serviceProblemTab = viewModel.serviceProblemTabForId(serviceProblemId);

        if (serviceProblemTab === null) {
            serviceProblemTab = Ext.create('widget.serviceProblemTab', {
                viewModel: {
                    data: {
                        serviceProblemId: serviceProblemId
                    }
                }
            });

            viewModel.addServiceproblemTab(serviceProblemId, serviceProblemTab);
            tabPanel.add(serviceProblemTab);
        }

        tabPanel.setActiveTab(serviceProblemTab);
    },

    onQueueTabClosed: function (queueId) {
        this.getViewModel().removeQueueTabForId(queueId);
    },

    onAgentQueueSelected: function (selectedQueue) {
        var tabPanel = this.lookupReference('tabPanel');
        var viewModel = this.getViewModel();
        var queueId = selectedQueue.queueId();
        var queueTab = viewModel.queueTabForId(queueId);

        if (queueTab === null) {
            queueTab = Ext.create('widget.queueTab', {
                viewModel: {
                    data: {
                        queue: selectedQueue
                    }
                }
            });

            viewModel.addQueueTab(queueId, queueTab);
            tabPanel.add(queueTab);
        }

        tabPanel.setActiveTab(queueTab);

        this.fireEvent('queueTabSelected', queueId);
    }

});