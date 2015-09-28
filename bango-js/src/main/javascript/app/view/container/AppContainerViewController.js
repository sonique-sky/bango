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
            'reassignServiceProblemDialog': {
                serviceProblemReassigned: 'closeServiceProblemAndSetMyItemsActive'
            },
            'clearServiceProblemDialog': {
                serviceProblemCleared: 'closeServiceProblemAndSetMyItemsActive'
            }
        }
    },

    tabPanel: undefined,

    initViewModel: function (viewModel) {
        var me = this,
                agent = me.getView().authenticatedAgent;

        me.tabPanel = me.lookupReference('tabPanel');
        me.tabPanel.removeAll(true);
        viewModel.clearActiveTabs();

        me.addTabIfPermitted(agent, 'PullServiceProblem', 'Spm.view.myitems.MyItemsTab');
        me.addTabIfPermitted(agent, 'AccessQueueDashboard', 'Spm.view.dashboard.queue.QueueDashboardTab');
        me.addTabIfPermitted(agent, 'AccessUserDashboard', 'Spm.view.dashboard.agent.AgentDashboardTab');
        me.addTabIfPermitted(agent, 'AccessMspDashboard', 'Spm.view.dashboard.msp.MspDashboardTab');
        me.addTabIfPermitted(agent, 'AccessAdminDashboard', 'Spm.view.dashboard.admin.AdminDashboardTab');

        var activeTabs = this.getViewModel().get('activeTabs');
        if (activeTabs) {
            this.tabPanel.setActiveTab(activeTabs.shift());
            this.getViewModel().set('activeTabs', activeTabs);
        } else {
            this.tabPanel.setActiveTab(0);
        }
    },

    addTabIfPermitted: function (agent, requiredPrivilege, tabClass) {
        if (agent.hasPrivilege(requiredPrivilege)) {
            this.tabPanel.add(Ext.create(tabClass));
        }
    },

    onServiceProblemHoldToggled: function (serviceProblemId) {
        var serviceProblemTab = this.getViewModel().serviceProblemTabForId(serviceProblemId);

        if (serviceProblemTab) {
            serviceProblemTab.fireEvent('staleData');
        }
        this.tabPanel.setActiveTab('myItems');
    },

    onWorkItemActionUpdated: function (serviceProblemId) {
        var serviceProblemTab = this.getViewModel().serviceProblemTabForId(serviceProblemId);

        if (serviceProblemTab) {
            serviceProblemTab.fireEvent('staleData');
        }
    },

    deriveSearchKey: function (params) {
        return Ext.String.format('{0}-{1}', params.property, params.value);
    },

    onDisplaySearchResults: function (store, params) {
        var me = this,
                searchKey = me.deriveSearchKey(params),
                viewModel = me.getViewModel(),
                searchResultTab = viewModel.searchResultTabForId(searchKey);

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
            me.tabPanel.add(searchResultTab);
        }

        me.tabPanel.setActiveTab(searchResultTab);
    },

    onDisplayServiceProblem: function (serviceProblem) {
        var me = this,
                serviceProblemId = serviceProblem.serviceProblemId(),
                viewModel = me.getViewModel(),
                serviceProblemTab = viewModel.serviceProblemTabForId(serviceProblemId);

        if (serviceProblemTab === null) {
            serviceProblemTab = Ext.create('Spm.view.serviceproblem.ServiceProblemTab', {
                viewModel: {
                    data: {
                        serviceProblem: serviceProblem
                    }
                }
            });

            viewModel.addServiceProblemTab(serviceProblemId, serviceProblemTab);
            me.tabPanel.add(serviceProblemTab);
        }

        me.tabPanel.setActiveTab(serviceProblemTab);
    },

    onServiceProblemSelected: function (serviceProblemId) {
        var me = this,
                viewModel = me.getViewModel(),
                serviceProblemTab = viewModel.serviceProblemTabForId(serviceProblemId);

        if (serviceProblemTab === null) {
            serviceProblemTab = Ext.create('Spm.view.serviceproblem.ServiceProblemTab', {
                viewModel: {
                    data: {
                        serviceProblemId: serviceProblemId
                    }
                }
            });

            viewModel.addServiceProblemTab(serviceProblemId, serviceProblemTab);
            me.tabPanel.add(serviceProblemTab);
        }

        me.tabPanel.setActiveTab(serviceProblemTab);
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
        var me = this,
                viewModel = me.getViewModel(),
                queueId = selectedQueue.queueId(),
                queueTab = viewModel.queueTabForId(queueId);

        if (queueTab === null) {
            queueTab = Ext.create('widget.queueTab', {
                viewModel: {
                    data: {
                        queue: selectedQueue
                    }
                }
            });

            viewModel.addQueueTab(queueId, queueTab);
            me.tabPanel.add(queueTab);
        }

        me.tabPanel.setActiveTab(queueTab);

        me.fireEvent('queueTabSelected', queueId);
    },

    closeServiceProblemAndSetMyItemsActive: function (serviceProblemId) {
        var me = this,
                viewModel = me.getViewModel(),
                serviceProblemTab = viewModel.serviceProblemTabForId(serviceProblemId);

        if (serviceProblemTab) {
            me.tabPanel.remove(serviceProblemTab);
            viewModel.removeServiceProblemTabForId(serviceProblemId);
        }
        me.tabPanel.setActiveTab('myItems');
    }

});
