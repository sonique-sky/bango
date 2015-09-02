Ext.define('Spm.view.admindashboard.queues.delete.DeleteQueueDialogViewModel', {
    extend: 'Spm.component.StandardDialogViewModel',
    alias: 'viewmodel.deleteQueueDialog',

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