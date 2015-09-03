Ext.define('app.view.admindashboard.teams.queueassignment.QueueAssignmentDialogViewController', {
    extend: 'Spm.component.StandardDialogViewController',
    alias: 'controller.queueAssignment',

    destinationStore: undefined,

    onShow: function () {
        var initialQueues = this.getViewModel().get('team').assignedQueues();
        this.destinationStore = this.getStore('destinationStore');
        this.destinationStore.addListener('datachanged', this.onDataChanged, this);

        this.getViewModel().set('initialQueueIds', Ext.Array.pluck(initialQueues, 'id'));
        this.destinationStore.add(initialQueues);
    },

    onAccept: function () {
        var me = this;
        var team = this.getViewModel().get('team');
        team.set('assignedQueues', this.transposedSelectedList());

        this.getViewModel().get('teams').sync({
            success: function () {
                me.getView().close();
            }
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
