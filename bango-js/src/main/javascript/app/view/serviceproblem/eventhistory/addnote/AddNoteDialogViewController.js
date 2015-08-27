Ext.define('Spm.view.serviceproblem.eventhistory.addnote.AddNoteDialogViewController', {
    extend: 'Spm.component.StandardDialogViewController',
    alias: 'controller.addNoteDialog',

    onAccept: function () {
        var me = this;
        var viewModel = this.getViewModel();
        var note = viewModel.get('note');

        note.save({
            params: {serviceProblemId: viewModel.get('serviceProblem').serviceProblemId()},
            success: function(records, operation) {
                me.fireEvent('eventHistoryNoteAdded', operation.getResponse());
                me.getView().close();
            }
        });
    }
});