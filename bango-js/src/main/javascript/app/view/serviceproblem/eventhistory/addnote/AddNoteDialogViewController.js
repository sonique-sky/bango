Ext.define('Spm.view.serviceproblem.eventhistory.addnote.AddNoteDialogViewController', {
    extend: 'Spm.component.StandardDialogViewController',
    alias: 'controller.addNoteDialog',

    requires: [
        'Spm.model.EventHistoryItem'
    ],


    initViewModel: function (viewModel) {
        viewModel.set('entityIdentifier', this.getView().entityIdentifier);
    },

    onAccept: function () {
        var me = this,
            viewModel = me.getViewModel(),
            store = viewModel.get('eventHistory');

        store.add(new Spm.model.EventHistoryItem({note: viewModel.get('noteContent')}));

        store.sync({
            params: {entityIdentifier: viewModel.get('entityIdentifier')},
            scope: me,
            success: me.closeView
        });
    }

});