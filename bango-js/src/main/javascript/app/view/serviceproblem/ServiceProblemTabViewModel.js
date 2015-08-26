Ext.define('Spm.view.serviceproblem.ServiceProblemTabViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.serviceProblemTab',

    stores: {},

    data: {
        serviceProblemId: null,
        serviceProblem: null,
        workItem: null
    },

    formulas: {
        serviceProblemTabTitle: {
            get: function (get) {
                return Ext.String.format('Service Problem [{0}]', get('serviceProblemId'));
            }
        },
        serviceProblemOwned: {
            bind: {
                bindTo: '{workItem}',
                deep: true
            },
            get: function (workItem) {
                var authenticatedAgent = this.get('authenticatedAgent');

                return workItem !== null && workItem.isAssignedTo(authenticatedAgent);
            }
        },
        pullServiceProblemButtonDisabled: {
            bind: {
                bindTo: '{workItem}',
                deep: true
            },
            get: function (workItem) {
                var isNotPullable = workItem == null || !workItem.isPullable();
                var authenticatedAgent = this.get('authenticatedAgent');
                var agentCanPullWorkItems = authenticatedAgent.hasPrivilege('PullServiceProblem');
                return isNotPullable || !agentCanPullWorkItems;
            }
        },
        toggleHoldIconCls: {
            bind: {
                bindTo: '{workItem}',
                deep: true
            },
            get: function (workItem) {
                return workItem === null || !workItem.isHeld() ? 'icon-hold' : 'icon-release';
            }
        },
        toggleHoldTooltip: {
            bind: {
                bindTo: '{workItem}',
                deep: true
            },
            get: function (workItem) {
                return workItem === null || !workItem.isHeld() ? 'Hold this Work Item' : 'Unhold this Work Item';
            }
        },
        assignedStateIconClass: {
            bind: {
                bindTo: '{serviceProblemOwned}'
            },
            get: function (serviceProblemOwned) {
                return serviceProblemOwned ? 'icon-sp-assigned' : 'icon-sp-unassigned';
            }
        }
    },

    serviceProblem: function () {
        return this.get('serviceProblem');
    },

    serviceProblemId: function () {
        return this.get('serviceProblemId');
    }
});
