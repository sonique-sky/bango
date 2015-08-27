Ext.define('Spm.view.container.AppContainerViewController', {
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
            'myItems': {
                serviceProblemSelected: 'onServiceProblemSelected',
                serviceProblemHoldToggled: 'onServiceProblemHoldToggled'
            },
            'serviceProblemTab': {
                serviceProblemTabClosed: 'onServiceProblemTabClosed',
                serviceProblemHoldToggled: 'onServiceProblemHoldToggled'
            },
            'search': {
                displayServiceProblem: 'onDisplayServiceProblem',
                displaySearchResults: 'onDisplaySearchResults'
            },
            'searchResultTab': {
                searchResultTabClosed: 'onSearchResultTabClosed',
                serviceProblemSelected: 'onServiceProblemSelected'
            },
            'workReminderDialog' : {
                workReminderCreated: 'onWorkReminderCreated'
            }
        }
    },

    onServiceProblemHoldToggled: function(serviceProblemId) {
        var viewModel = this.getViewModel();
        var tabPanel = this.lookupReference('tabPanel');
        var serviceProblemTab = viewModel.serviceProblemTabForId(serviceProblemId);
        if(serviceProblemTab) {
            serviceProblemTab.fireEvent('staleData');
        }
        tabPanel.setActiveTab('myItems');
    },

    onWorkReminderCreated: function(serviceProblemId) {
        var tabPanel = this.lookupReference('tabPanel');
        var viewModel = this.getViewModel();
        var serviceProblemTab = viewModel.serviceProblemTabForId(serviceProblemId);
        if(serviceProblemTab) {
            tabPanel.remove(serviceProblemTab);
            viewModel.removeServiceProblemTabForId(serviceProblemId);
        }
        tabPanel.setActiveTab('myItems');
    },

    onAuthenticated: function (authenticatedAgent) {
        var tabPanel = this.lookupReference('tabPanel');
        tabPanel.removeAll(true);
        this.getViewModel().clearActiveTabs();

        var myItems = Ext.create('widget.myItems');
        tabPanel.add(myItems);
        tabPanel.setActiveTab(myItems);

        if (authenticatedAgent.hasPrivilege('AccessAdminDashboard')) {
            var adminDashboardTab = Ext.create('widget.adminDashboardTab');
            tabPanel.add(adminDashboardTab);
            tabPanel.setActiveTab(adminDashboardTab);
        }
    },

    deriveSearchKey: function (params) {
        return Ext.String.format('{0}-{1}', params.searchTerm, params.searchParameter);
    },

    onDisplaySearchResults: function(store, params) {
        var searchKey = this.deriveSearchKey(params);
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

    onSearchResultTabClosed: function(params) {
        this.getViewModel().removeSearchResultTabForId(this.deriveSearchKey(params));
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