Ext.define('Spm.view.serviceproblem.reassign.ReassignServiceProblemDialogViewModel', {
    extend: 'Spm.component.StandardDialogViewModel',
    alias: 'viewmodel.reassignServiceProblemDialog',

    stores: {
        agents: {
            type: 'agents',
            autoLoad: true,
            pageSize: 0,
            listeners: {
                load: 'storeLoad'
            }
        }
    },

    serviceProblemId: function () {
        return this.get('serviceProblem.serviceProblemId');
    }
});