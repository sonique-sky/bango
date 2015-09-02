Ext.define('app.view.admindashboard.teams.queueassignment.QueueAssignmentDialogViewController', {
    extend: 'Spm.component.StandardDialogViewController',
    alias: 'controller.queueAssignment',

    destinationStore: undefined,

    onShow: function () {
        this.destinationStore = this.getStore('destinationStore');
        var team = this.getViewModel().get('team');
        //this.destinationStore.setProxy(Ext.create('Ext.data.proxy.Memory', {
        //    reader: {type: 'json'}
        //}));
        this.destinationStore.loadRawData(team.assignedQueues());

        this.destinationStore.addListener('datachanged', this.onDataChanged, this);
        this.getViewModel().set('initialQueueIds', this.destinationStore.getData().collect('id'));
        this.onDataChanged(this.destinationStore);
    },

    onAccept: function () {
        var me = this;
        var team = this.getViewModel().get('team');

        debugger;
        team.save({
            success: function () {
                me.getView().close();
            },
            failure: function () {
                me.fireEvent('teamUpdateFailed'); // hack to force update of team grid to remove changes to store
                //me.destinationStore.rejectChanges();
                //team.reject(); //doesn't work
            }
        });
    },

    onCancel: function () {
        //this.destinationStore.rejectChanges(); //doesn't work
        this.fireEvent('teamUpdateFailed'); // hack to force update of team grid to remove changes to store
        this.getView().close();
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
    }
});
