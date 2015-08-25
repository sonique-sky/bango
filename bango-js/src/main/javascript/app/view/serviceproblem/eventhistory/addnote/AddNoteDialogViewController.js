Ext.define('Spm.view.serviceproblem.eventhistory.addnote.AddNoteDialogViewController', {
    extend: 'Spm.component.StandardDialogViewController',
    alias: 'controller.addNoteDialog',

    listen: {
        component: {
            'addNoteDialog': {
                show: 'onShow'
            }
        }
    },

    onShow: function () {
        this.getViewModel().set('note', Ext.create('Spm.model.EventHistoryItem'));
    },

    onAccept: function () {
        var me = this;
        var viewModel = this.getViewModel();
        var note = viewModel.get('note');

        note.save({
            params: {serviceProblemId: viewModel.get('serviceProblem').serviceProblemId()},
            callback: function(records, operation, success) {
                me.fireEvent('eventHistoryNoteAdded', operation.getResponse());
                me.getView().close();
            }
        });
    }
});