Ext.define('Spm.view.admindashboard.teams.queueassignment.QueueAssignmentDialogViewModel', {
    extend: 'Spm.component.StandardDialogViewModel',
    alias: 'viewmodel.queueAssignmentDialog',

    stores: {
        unassignedQueues: Ext.create("Ext.data.Store", {
            model: 'Spm.model.Queue',
            proxy: 'unassignedQueuesProxy',
            autoLoad: false,
            autoSync: false

        }),
        assignedQueues: Ext.create("Ext.data.Store", {
            model: 'Spm.model.Queue',
            proxy: 'assignedQueuesProxy',
            autoLoad: false,
            autoSync: false
        })
    },
    data: {
        team: null
    }
});