Ext.define('Spm.view.serviceproblem.ServiceProblemTabViewModel', {
        extend: 'Ext.app.ViewModel',
        alias: 'viewmodel.serviceProblemTab',

    stores: {
        eventHistory : {
            type: 'eventHistory'
        }
    },

    data: {
        serviceProblemId: null,
        serviceProblem: null
    },

    formulas: {
        serviceProblemTabTitle: {
            get: function (get) {
                return Ext.String.format('Service Problem [{0}]', get('serviceProblemId'));
            }
        }
    }

});
