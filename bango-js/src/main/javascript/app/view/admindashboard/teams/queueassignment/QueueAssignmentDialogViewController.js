Ext.define('app.view.admindashboard.teams.queueassignment.QueueAssignmentDialogViewController', {
    extend: 'Spm.component.StandardDialogViewController',
    alias: 'controller.queueAssignmentDialog',

    onShow: function () {
        this.queuesStoreOf('unassignedQueues').load({params: {teamId: this.getViewModel().get('team.id')}});
        this.queuesStoreOf('assignedQueues').load({params: {teamId: this.getViewModel().get('team.id')}});
    },

    //TODO: use extjs collections properly
    assignAllQueues: function () {
        var unassignedQueuesStore = this.queuesStoreOf('unassignedQueues');
        var unassignedQueues = unassignedQueuesStore.getData();
        this.queuesStoreOf('assignedQueues').loadData(unassignedQueues.getRange(0, unassignedQueues.length), {append: true});

        unassignedQueuesStore.removeAll();
    },

    assignSelectedQueues: function () {
        var selectedQueues = this.getSelectedQueuesOf('unassignedQueuesGrid');
        this.queuesStoreOf('assignedQueues').loadData(selectedQueues, {append: true});
        this.queuesStoreOf('unassignedQueues').remove(selectedQueues);
    },

    removeAssignedQueues: function () {
        var selectedQueues = this.getSelectedQueuesOf('assignedQueuesGrid');
        this.queuesStoreOf('unassignedQueues').loadData(selectedQueues, {append: true});
        this.queuesStoreOf('assignedQueues').remove(selectedQueues);
    },

    removeAllAssignedQueues: function () {
        var assignedQueuesStore = this.queuesStoreOf('assignedQueues');
        var assignedQueues = assignedQueuesStore.getData();

        this.queuesStoreOf('unassignedQueues').loadData(assignedQueues.getRange(0, assignedQueues.length), {append: true});
        assignedQueuesStore.removeAll();
    },

    queuesStoreOf: function (storeName) {
        return this.getViewModel().getStore(storeName);
    },

    getSelectedQueuesOf: function (reference) {
        return this.getView().lookupReference(reference).getSelection();
    }
});