Ext.define('Spm.view.serviceproblem.eventhistory.addnote.AddNoteDialogViewModel', {
    extend: 'Spm.component.StandardDialogViewModel',
    alias: 'viewmodel.addNoteDialog',

    data: {
        noteContent: null
    },

    formulas: {
        acceptButtonDefaultDisabled: {
            bind: {
                bindTo: '{noteContent}'
            },
            get: function (content) {
                return !content;
            }
        }
    }

});
