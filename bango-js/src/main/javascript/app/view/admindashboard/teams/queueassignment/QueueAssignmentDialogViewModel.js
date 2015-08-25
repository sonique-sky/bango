Ext.define('Spm.view.admindashboard.teams.queueassignment.QueueAssignmentDialogViewModel', {
    extend: 'Spm.component.StandardDialogViewModel',
    alias: 'viewmodel.queueAssignmentDialog',

    stores: {
        unassignedQueues: {
            type: 'unassignedQueues'
        }
    },
    data: {
        teamId: null
    }

});