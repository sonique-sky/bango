Ext.define('Spm.view.serviceproblem.ServiceProblemTabViewModel', {
        extend: 'Ext.app.ViewModel',
        alias: 'viewmodel.serviceProblemTab',

    stores: {
    },

    data: {
        serviceProblemId: null
    },

    formulas: {
        serviceProblemTabTitle: {
            get: function (get) {
                return Ext.String.format('Service Problem [{0}]', get('serviceProblemId'));
            }
        }
    }

});
