Ext.define('Spm.view.serviceproblem.eventhistory.AddNoteDialogViewModel', {
    extend: 'Spm.view.component.StandardDialogViewModel',
    alias: 'viewmodel.addNoteDialog',

    data: {
        note: null,
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
