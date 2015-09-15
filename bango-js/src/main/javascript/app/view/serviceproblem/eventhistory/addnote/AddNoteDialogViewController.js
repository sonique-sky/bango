Ext.define('Spm.view.serviceproblem.eventhistory.addnote.AddNoteDialogViewController', {
    extend: 'Spm.component.StandardDialogViewController',
    alias: 'controller.addNoteDialog',

    onAccept: function () {
        var me = this,
            viewModel = me.getViewModel(),
            store = viewModel.get('eventHistory');

        store.add(new Spm.model.EventHistoryItem({note: viewModel.get('noteContent')}));

        store.sync({
            params: {serviceProblemId: viewModel.get('serviceProblem').serviceProblemId()},
            success: me.closeView
        });
    }
});