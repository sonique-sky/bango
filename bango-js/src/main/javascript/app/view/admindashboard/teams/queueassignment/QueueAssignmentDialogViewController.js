Ext.define('app.view.admindashboard.teams.queueassignment.QueueAssignmentDialogViewController', {
    extend: 'Spm.component.StandardDialogViewController',
    alias: 'controller.queueAssignmentDialog',

    onShow: function () {
        this.getViewModel().getStore('unassignedQueues').load({params: {teamId: this.getViewModel().get('teamId')}});
        this.getViewModel().getStore('assignedQueues').load({params: {teamId: this.getViewModel().get('teamId')}});
    }
});