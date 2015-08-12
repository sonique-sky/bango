Ext.define('Spm.view.serviceproblem.ServiceProblemTabViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.serviceProblemTab',

    listen: {
        component: {
            'serviceProblemTab': {
                //activate: 'onServiceProblemTabActivated',
                //deactivate: 'onServiceProblemTabDeactivated',
                //close: 'onServiceProblemTabClosed',
                added: 'onServiceProblemTabAdded'
            }
        }
    },

    onServiceProblemTabAdded: function () {
        var viewModel = this.getViewModel();
        var serviceProblemId = viewModel.get('serviceProblemId');

        Spm.model.ServiceProblem.load(serviceProblemId, {
            success: function () {
                viewModel.set('serviceProblem', this);
            }
        });


    }

});