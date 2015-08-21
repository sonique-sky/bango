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
            },
            'serviceProblemTab': {
                serviceProblemTabClosed: 'onServiceProblemTabClosed'
            },
            'search': {
                displayServiceProblem: 'onDisplayServiceProblem',
                displaySearchResults: 'onDisplaySearchResults'
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

    onDisplaySearchResults: function(store, params) {
        var searchKey = Ext.String.format('{0}-{1}', params.searchTerm, params.searchParameter);
        var tabPanel = this.lookupReference('tabPanel');
        var viewModel = this.getViewModel();
        var searchResultTab = viewModel.searchResultTabForId(searchKey);

        if (searchResultTab === null) {
            searchResultTab = Ext.create('widget.searchResultTab', {
                viewModel: {
                    stores: {
                        serviceProblems: store
                    },
                    data: {
                        params: params
                    }
                }
            });

            viewModel.addSearchResultTab(searchKey, searchResultTab);
            tabPanel.add(searchResultTab);
        }

        tabPanel.setActiveTab(searchResultTab);
    },

    onDisplayServiceProblem: function(serviceProblem) {
        var serviceProblemId = serviceProblem.serviceProblemId();
        var tabPanel = this.lookupReference('tabPanel');
        var viewModel = this.getViewModel();
        var serviceProblemTab = viewModel.serviceProblemTabForId(serviceProblemId);

        if (serviceProblemTab === null) {
            serviceProblemTab = Ext.create('widget.serviceProblemTab', {
                viewModel: {
                    data: {
                        serviceProblemId: serviceProblemId,
                        serviceProblem: serviceProblem
                    }
                }
            });

            viewModel.addServiceProblemTab(serviceProblemId, serviceProblemTab);
            tabPanel.add(serviceProblemTab);
        }

        tabPanel.setActiveTab(serviceProblemTab);
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

            viewModel.addServiceProblemTab(serviceProblemId, serviceProblemTab);
            tabPanel.add(serviceProblemTab);
        }

        tabPanel.setActiveTab(serviceProblemTab);
    },

    onQueueTabClosed: function (queueId) {
        this.getViewModel().removeQueueTabForId(queueId);
    },

    onServiceProblemTabClosed: function (serviceProblemId) {
        this.getViewModel().removeServiceProblemTabForId(serviceProblemId);
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