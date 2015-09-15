Ext.define('Spm.view.dashboard.admin.teams.queueassignment.QueueAssignmentDialogViewController', {
    extend: 'Spm.component.StandardDialogViewController',
    alias: 'controller.queueAssignment',

    destinationStore: undefined,

    initViewModel: function (viewModel) {
        var me = this,
            team = me.getView().team,
            initialQueues = team.assignedQueues();

        viewModel.set('team', team);
        me.destinationStore = me.getStore('destinationStore');
        me.destinationStore.addListener('datachanged', me.onDataChanged, me);

        me.getViewModel().set('initialQueueIds', Ext.Array.pluck(initialQueues, 'id'));
        me.destinationStore.add(initialQueues);
    },

    onAccept: function () {
        var me = this;
        var team = me.getViewModel().get('team');
        team.set('assignedQueues', me.transposedSelectedList());

        this.getViewModel().get('teams').sync({
            success: me.closeView, scope: me
        });
    },

    addAll: function () {
        this.destinationStore.add(this.getStore('sourceStore').getData().items);
    },

    addSelected: function () {
        this.destinationStore.add(this.getSelectedQueuesOf('sourceGrid'));
    },

    removeSelected: function () {
        this.destinationStore.remove(this.getSelectedQueuesOf('destinationGrid'));
    },

    removeAll: function () {
        this.destinationStore.removeAll();
    },

    getSelectedQueuesOf: function (reference) {
        return this.getView().lookupReference(reference).getSelection();
    },

    onDataChanged: function (destinationStore) {
        this.getStore('sourceStore').filterBy(function (record) {
            return destinationStore.findBy(function (queue) {
                        return queue.queueId() == record.queueId();
                    }) == -1;
        });
        this.getViewModel().set('currentQueueIds', this.destinationStore.collect('id'));
    },

    transposedSelectedList: function () {
        var assignedQueuesArray = [];
        this.destinationStore.getData().each(function (q) {
            assignedQueuesArray.push(Ext.create('Spm.model.Queue', {
                id: q.queueId(),
                name: q.queueName()
            }));
        });
        return assignedQueuesArray;
    }
});
