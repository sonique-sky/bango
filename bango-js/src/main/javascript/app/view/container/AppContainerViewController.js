Ext.define('Spm.view.container.AppContainerViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.appContainer',

    requires: [
        'Spm.view.dashboard.admin.AdminDashboardTab',
        'Spm.view.dashboard.agent.AgentDashboardTab',
        'Spm.view.dashboard.msp.MspDashboardTab',
        'Spm.view.dashboard.queue.QueueDashboardTab',
        'Spm.view.myitems.MyItemsTab',
        'Spm.view.queue.QueueTab',
        'Spm.view.search.SearchResultTab',
        'Spm.view.serviceproblem.ServiceProblemTab'
    ],

    listen: {
        controller: {
            'myQueues': {
                agentQueueSelected: 'onAgentQueueSelected'
            },
            'queueDashboard': {
                queueSelected: 'onAgentQueueSelected'
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
            'searchResult': {
                searchResultTabClosed: 'onSearchResultTabClosed',
                serviceProblemSelected: 'onServiceProblemSelected'
            },
            'workReminderDialog': {
                workReminderCreated: 'closeServiceProblemAndSetMyItemsActive'
            },
            'troubleReportDialog': {
                troubleReportCreated: 'closeServiceProblemAndSetMyItemsActive'
            },
            'nextWorkItemDialog': {
                workItemUpdated: 'onWorkItemActionUpdated'
            },
            'transferServiceProblemDialog': {
                serviceProblemTransferred: 'closeServiceProblemAndSetMyItemsActive'
            },
            'clearServiceProblemDialog': {
                serviceProblemCleared: 'closeServiceProblemAndSetMyItemsActive'
            }
        }
    },

    initViewModel: function (viewModel) {
        var agent = this.getView().authenticatedAgent;
        viewModel.clearActiveTabs();

        var tabPanel = this.lookupReference('tabPanel');
        tabPanel.removeAll(true);

        var myItems = Ext.create('widget.myItems');
        tabPanel.add(myItems);
        tabPanel.setActiveTab(myItems);

        this.addTabIfPermitted(agent, 'AccessQueueDashboard', 'Spm.view.dashboard.queue.QueueDashboardTab');
        this.addTabIfPermitted(agent, 'AccessUserDashboard', 'Spm.view.dashboard.agent.AgentDashboardTab');
        this.addTabIfPermitted(agent, 'AccessMspDashboard', 'Spm.view.dashboard.msp.MspDashboardTab');
        this.addTabIfPermitted(agent, 'AccessAdminDashboard', 'Spm.view.dashboard.admin.AdminDashboardTab');
    },

    addTabIfPermitted: function (agent, requiredPrivilege, tabClass) {
        if (agent.hasPrivilege(requiredPrivilege)) {
            this.lookupReference('tabPanel').add(Ext.create(tabClass));
        }
    },

    onServiceProblemHoldToggled: function (serviceProblemId) {
        var viewModel = this.getViewModel();
        var tabPanel = this.lookupReference('tabPanel');
        var serviceProblemTab = viewModel.serviceProblemTabForId(serviceProblemId);
        if (serviceProblemTab) {
            serviceProblemTab.fireEvent('staleData');
        }
        tabPanel.setActiveTab('myItems');
    },

    onWorkItemActionUpdated: function (serviceProblemId) {
        var viewModel = this.getViewModel();
        var serviceProblemTab = viewModel.serviceProblemTabForId(serviceProblemId);
        if (serviceProblemTab) {
            serviceProblemTab.fireEvent('staleData');
        }
    },

    deriveSearchKey: function (params) {
        return Ext.String.format('{0}-{1}', params.property, params.value);
    },

    onDisplaySearchResults: function (store, params) {
        var searchKey = this.deriveSearchKey(params);
        var tabPanel = this.lookupReference('tabPanel');
        var viewModel = this.getViewModel();
        var searchResultTab = viewModel.searchResultTabForId(searchKey);

        if (searchResultTab === null) {
            searchResultTab = Ext.create('widget.searchResult', {
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

    onDisplayServiceProblem: function (serviceProblem) {
        var tabPanel = this.lookupReference('tabPanel');
        var serviceProblemId = serviceProblem.serviceProblemId();
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

    onSearchResultTabClosed: function (params) {
        this.getViewModel().removeSearchResultTabForId(this.deriveSearchKey(params));
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
    },

    closeServiceProblemAndSetMyItemsActive: function (serviceProblemId) {
        var tabPanel = this.lookupReference('tabPanel');
        var viewModel = this.getViewModel();
        var serviceProblemTab = viewModel.serviceProblemTabForId(serviceProblemId);
        if (serviceProblemTab) {
            tabPanel.remove(serviceProblemTab);
            viewModel.removeServiceProblemTabForId(serviceProblemId);
        }
        tabPanel.setActiveTab('myItems');
    }
});
