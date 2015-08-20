Ext.define('Spm.view.serviceproblem.ServiceProblemTabViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.serviceProblemTab',

    stores: {},

    data: {
        serviceProblemId: null,
        serviceProblem: null
    },

    formulas: {
        serviceProblemTabTitle: {
            get: function (get) {
                return Ext.String.format('Service Problem [{0}]', get('serviceProblemId'));
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
        }
    }
});
