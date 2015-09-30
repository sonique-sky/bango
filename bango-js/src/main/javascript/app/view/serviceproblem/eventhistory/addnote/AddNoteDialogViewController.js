Ext.define('Spm.view.serviceproblem.eventhistory.addnote.AddNoteDialogViewController', {
    extend: 'Spm.component.StandardDialogViewController',
    alias: 'controller.addNoteDialog',

    requires: [
        'Spm.model.EventHistoryItem'
    ],

    onAccept: function () {
        var me = this,
            viewModel = me.getViewModel(),
            store = viewModel.get('eventHistory');

        store.add(new Spm.model.EventHistoryItem({note: viewModel.get('noteContent')}));
        store.sync({
            params: {entityIdentifier: viewModel.get('serviceProblem').serviceProblemId()},
            scope: me,
            success: me.closeView
        });
    }

});