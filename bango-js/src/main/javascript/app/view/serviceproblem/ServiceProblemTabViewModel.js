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
            get: function (get) {
                //var authenticatedAgent = this.getStore('authenticatedAgent').load();
                //var workItem = get('serviceProblem').workItem();
                //
                //return !authenticatedAgent.hasPrivilege('PullServiceProblem') || !workItem.isPullable();
                return false;
            }
        }
    }

});
