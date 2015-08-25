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
                bindTo: '{serviceProblem}',
                deep: true
            },
            get: function (serviceProblem) {
                var authenticatedAgent = this.get('authenticatedAgent');

                return serviceProblem !== null && serviceProblem.getWorkItem().isAssignedTo(authenticatedAgent);
            }
        },
        pullServiceProblemButtonDisabled: {
            bind: {
                bindTo: '{serviceProblem}',
                deep: true
            },
            get: function (serviceProblem) {
                var isNotPullable = serviceProblem == null || serviceProblem.getWorkItem() == null || !serviceProblem.getWorkItem().isPullable();
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
            get: function(workItem) {
                return workItem === null || !workItem.isHeld() ? 'icon-hold' : 'icon-release';
            }
        }
    }
});
