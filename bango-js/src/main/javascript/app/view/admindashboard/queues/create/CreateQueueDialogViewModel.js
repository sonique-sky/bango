Ext.define('Spm.view.admindashboard.teams.create.CreateQueueDialogViewModel', {
    extend: 'Spm.component.StandardDialogViewModel',
    alias: 'viewmodel.createQueueDialog',

    data: {
        queue: null
    },

    formulas: {
        acceptButtonDefaultDisabled: {
            bind: {
                bindTo: '{queue.name}'
            },
            get: function (name) {
                return !name;
            }
        }
    }
});