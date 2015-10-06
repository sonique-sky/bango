Ext.define('Spm.view.container.AppContainerViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.appContainer',

    requires: [
        'Spm.view.dashboard.admin.AdminDashboardTab',
        'Spm.view.dashboard.agent.AgentDashboardTab',
        'Spm.view.dashboard.msp.MspDashboardTab',
        'Spm.view.dashboard.queue.QueueDashboardTab',
        'Spm.view.myitems.MyItemsTab',
        'Spm.view.filtered.FilteredServiceProblems',
        'Spm.view.serviceproblem.ServiceProblemTab'
    ],

    listen: {
        controller: {
            'myQueues': {
                agentQueueSelected: 'displayQueueTab'
            },
            'queueDashboard': {
                queueSelected: 'displayQueueTab'
            },
            'filteredServiceProblems': {
                serviceProblemSelected: 'onServiceProblemSelected'
            },
            'myItems': {
                serviceProblemSelected: 'onServiceProblemSelected',
                serviceProblemHoldToggled: 'onServiceProblemHoldToggled'
            },
            'serviceProblemTab': {
                serviceProblemTabClosed: 'onServiceProblemTabClosed',
                serviceProblemHoldToggled: 'onServiceProblemHoldToggled',
                managedLineTestRequested: 'refreshServiceProblem'
            },
            'search': {
                displayServiceProblem: 'onDisplayServiceProblem',
                displaySearchResults: 'onDisplaySearchResults'
            },
            'searchResult': {
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
            'associateServiceProblemToMspDialog': {
                serviceProblemAssociatedToMsp: 'closeServiceProblemAndSetMyItemsActive'
            },
            'clearServiceProblemDialog': {
                serviceProblemCleared: 'closeServiceProblemAndSetMyItemsActive'
            },
            'managedLineTestDialog': {
                managedLineTestRequested: 'refreshServiceProblem'
            }
        }
    },

    tabPanel: undefined,

    initViewModel: function (viewModel) {
        var me = this,
            agent = viewModel.get('authenticatedAgent');

        me.tabPanel = me.lookupReference('tabPanel');
        me.addTabIfPermitted(agent, 'PullServiceProblem', 'Spm.view.myitems.MyItemsTab');
        me.addTabIfPermitted(agent, 'AccessQueueDashboard', 'Spm.view.dashboard.queue.QueueDashboardTab');
        me.addTabIfPermitted(agent, 'AccessUserDashboard', 'Spm.view.dashboard.agent.AgentDashboardTab');
        me.addTabIfPermitted(agent, 'AccessMspDashboard', 'Spm.view.dashboard.msp.MspDashboardTab');
        me.addTabIfPermitted(agent, 'AccessAdminDashboard', 'Spm.view.dashboard.admin.AdminDashboardTab');

        me.tabPanel.setActiveTab(0);
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

    refreshServiceProblem: function (serviceProblemId) {
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
            searchResultTab = me.tabPanel.getComponent(searchKey);

        if (!searchResultTab) {
            searchResultTab = Ext.create({
                xtype: 'filteredServiceProblems',
                itemId: searchKey,
                store: store
            });

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
            serviceProblemTab = Ext.create({
                xtype: 'serviceProblemTab',
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
            serviceProblemTab = Ext.create({
                xtype: 'serviceProblemTab',
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

    onServiceProblemTabClosed: function (serviceProblemId) {
        this.getViewModel().removeServiceProblemTabForId(serviceProblemId);
    },

    displayQueueTab: function (selectedQueue) {
        var me = this,
            queueId = selectedQueue.queueId(),
            searchKey = 'queueId-' + queueId,
            queueTab = me.tabPanel.getComponent(searchKey);

        if (!queueTab) {
            var store = Ext.create('store.serviceProblems');
            store.filter('queueId', queueId);
            queueTab = Ext.create({
                xtype: 'filteredServiceProblems',
                itemId: searchKey,
                store: store,
                viewModel: {
                    data: {
                        queue: selectedQueue
                    }
                }
            });

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
