Ext.define('Spm.view.serviceproblem.eventhistory.addnote.AddNoteDialogViewModel', {
    extend: 'Spm.component.StandardDialogViewModel',
    alias: 'viewmodel.addNoteDialog',

    data: {
        note: Ext.create('Spm.model.EventHistoryItem'),
        acceptButtonText: 'OK',
        acceptButtonDefaultDisabled: false
    },

    formulas: {
        acceptButtonDefaultDisabled: {
            bind: {
                bindTo: '{note}',
                deep: true
            },
            get: function (note) {
                return !note.get('note');
            }
        }
    }

});
