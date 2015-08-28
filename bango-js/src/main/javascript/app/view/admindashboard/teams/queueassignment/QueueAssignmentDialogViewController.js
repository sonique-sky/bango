Ext.define('app.view.admindashboard.teams.queueassignment.QueueAssignmentDialogViewController', {
    extend: 'Spm.component.StandardDialogViewController',
    alias: 'controller.queueAssignmentDialog',

    onShow: function () {
        this.queuesStoreOf('unassignedQueues').load({params: {teamId: this.getViewModel().get('team.id')}});
        this.queuesStoreOf('assignedQueues').load({params: {teamId: this.getViewModel().get('team.id')}});
    },

    onAccept: function () {
        var me = this;
        var unassignedQueuesStore = this.queuesStoreOf('unassignedQueues');
        var assignedQueuesStore = this.queuesStoreOf('assignedQueues');

        if (this.hasStoreUpdates([assignedQueuesStore, unassignedQueuesStore])) {
            var team = this.getViewModel().get('team');
            var assignedQueuesArray = [];

            assignedQueuesStore.getData().each(function (q) {
                assignedQueuesArray.push(Ext.create('Spm.model.Queue', {
                    id: q.get('id'),
                    name: q.get('name')
                }));
            });

            team.set("assignedQueues", assignedQueuesArray);
            team.save({
                success: function () {
                    me.getView().close();
                },
                failure: function () {
                    team.reject();
                    unassignedQueuesStore.rejectChanges();
                    assignedQueuesStore.rejectChanges();

                    Ext.Msg.alert('Error', 'Failed to save queue assignment updates.');
                }
            });
        }
    },

    assignAllQueues: function () {
        var unassignedQueuesStore = this.queuesStoreOf('unassignedQueues');
        var assignedQueuesStore = this.queuesStoreOf('assignedQueues');

        var allUnassignedQueues = unassignedQueuesStore.removeAll();
        assignedQueuesStore.loadData(allUnassignedQueues, {append: true});

        this.setOkButtonEnabled([unassignedQueuesStore, assignedQueuesStore]);
    },

    assignSelectedQueues: function () {
        var selectedQueues = this.getSelectedQueuesOf('unassignedQueuesGrid');
        var unassignedQueuesStore = this.queuesStoreOf('unassignedQueues');
        var assignedQueuesStore = this.queuesStoreOf('assignedQueues');

        assignedQueuesStore.loadData(selectedQueues, {append: true});
        unassignedQueuesStore.remove(selectedQueues);
        this.setOkButtonEnabled([unassignedQueuesStore, assignedQueuesStore]);
    },

    removeAssignedQueues: function () {
        var selectedQueues = this.getSelectedQueuesOf('assignedQueuesGrid');
        var unassignedQueuesStore = this.queuesStoreOf('unassignedQueues');
        var assignedQueuesStore = this.queuesStoreOf('assignedQueues');

        unassignedQueuesStore.loadData(selectedQueues, {append: true});
        assignedQueuesStore.remove(selectedQueues);

        this.setOkButtonEnabled([unassignedQueuesStore, assignedQueuesStore]);
    },

    removeAllAssignedQueues: function () {
        var unassignedQueuesStore = this.queuesStoreOf('unassignedQueues');
        var assignedQueuesStore = this.queuesStoreOf('assignedQueues');

        var allAssignedQueues = assignedQueuesStore.removeAll();
        unassignedQueuesStore.loadData(allAssignedQueues, {append: true});

        this.setOkButtonEnabled([unassignedQueuesStore, assignedQueuesStore]);
    },

    queuesStoreOf: function (storeName) {
        return this.getViewModel().getStore(storeName);
    },

    getSelectedQueuesOf: function (reference) {
        return this.getView().lookupReference(reference).getSelection();
    },

    setOkButtonEnabled: function (stores) {
        this.getViewModel().set('acceptButtonDefaultDisabled', !this.hasStoreUpdates(stores));
    },

    hasStoreUpdates: function (stores) {
        return stores.filter(function (store) {
                return store.getRemovedRecords().length > 0;
            }).length > 0;
    }
});
