Ext.define('Spm.view.serviceproblem.eventhistory.AddNoteDialogViewModel', {
    extend: 'Spm.view.component.StandardDialogViewModel',
    alias: 'viewmodel.addNoteDialog',

    data: {
        noteText: null,
        acceptButtonText: 'OK',
        acceptButtonDefaultDisabled: false
    },

    formulas: {
        acceptButtonDefaultDisabled: {
            get: function (get) {
                return !get('noteText');
            }
        }
    }

});
