Ext.define('Spm.view.serviceproblem.eventhistory.addnote.AddNoteDialogViewModel', {
    extend: 'Spm.component.StandardDialogViewModel',
    alias: 'viewmodel.addNoteDialog',

    data: {
        noteContent: null,
        acceptButtonDefaultDisabled: false
    },

    formulas: {
        acceptButtonDefaultDisabled: {
            bind: {
                bindTo: 'noteContent'
            },
            get: function (content) {
                return !content;
            }
        }
    }
});
