Ext.define('app.view.admindashboard.teams.queueassignment.QueueAssignmentDialogViewController', {
    extend: 'Spm.component.StandardDialogViewController',
    alias: 'controller.queueAssignmentDialog',

    onShow: function () {
        this.queuesStoreOf('unassignedQueues').load({params: {teamId: this.getViewModel().get('team.id')}});
        this.queuesStoreOf('assignedQueues').load({params: {teamId: this.getViewModel().get('team.id')}});
    },

    onAccept: function () {
        this.queuesStoreOf('unassignedQueues').commitChanges();
        this.queuesStoreOf('assignedQueues').commitChanges();
        this.getView().close();
    },

    //TODO: use extjs collections properly
    assignAllQueues: function () {
        var unassignedQueuesStore = this.queuesStoreOf('unassignedQueues');
        var assignedQueuesStore = this.queuesStoreOf('assignedQueues');

        var unassignedQueues = unassignedQueuesStore.getData();
        assignedQueuesStore.loadData(unassignedQueues.getRange(0, unassignedQueues.length), {append: true});
        unassignedQueuesStore.removeAll();

        this.setOkButtonEnabled(unassignedQueuesStore, assignedQueuesStore);
    },

    assignSelectedQueues: function () {
        var selectedQueues = this.getSelectedQueuesOf('unassignedQueuesGrid');
        var unassignedQueuesStore = this.queuesStoreOf('unassignedQueues');
        var assignedQueuesStore = this.queuesStoreOf('assignedQueues');

        assignedQueuesStore.loadData(selectedQueues, {append: true});
        unassignedQueuesStore.remove(selectedQueues);

        this.setOkButtonEnabled(unassignedQueuesStore, unassignedQueuesStore);
    },

    removeAssignedQueues: function () {
        var selectedQueues = this.getSelectedQueuesOf('assignedQueuesGrid');
        var unassignedQueuesStore = this.queuesStoreOf('unassignedQueues');
        var assignedQueuesStore = this.queuesStoreOf('assignedQueues');

        unassignedQueuesStore.loadData(selectedQueues, {append: true});
        assignedQueuesStore.remove(selectedQueues);

        this.setOkButtonEnabled(unassignedQueuesStore, assignedQueuesStore);
    },

    removeAllAssignedQueues: function () {
        var unassignedQueuesStore = this.queuesStoreOf('unassignedQueues');
        var assignedQueuesStore = this.queuesStoreOf('assignedQueues');

        var assignedQueues = assignedQueuesStore.getData();
        unassignedQueuesStore.loadData(assignedQueues.getRange(0, assignedQueues.length), {append: true});
        assignedQueuesStore.removeAll();

        this.setOkButtonEnabled(unassignedQueuesStore, assignedQueuesStore);
    },

    queuesStoreOf: function (storeName) {
        return this.getViewModel().getStore(storeName);
    },

    getSelectedQueuesOf: function (reference) {
        return this.getView().lookupReference(reference).getSelection();
    },

    //TODO: track updates correctly
    setOkButtonEnabled: function (unassignedQueueStore, assignedQueueStore) {
        var hasStoreChanges =
            (unassignedQueueStore.getNewRecords().length > 0 || unassignedQueueStore.getRemovedRecords().length > 0)
            && (assignedQueueStore.getNewRecords().length > 0 || assignedQueueStore.getRemovedRecords().length > 0);

        this.getViewModel().set('acceptButtonDefaultDisabled', !hasStoreChanges);
    }
});