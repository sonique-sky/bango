Ext.define('Spm.view.admindashboard.teams.queueassignment.QueueAssignmentDialogViewModel', {
    extend: 'Spm.component.StandardDialogViewModel',
    alias: 'viewmodel.queueAssignment',

    stores: {
        sourceStore: {
            type: 'queues',
            autoLoad: true
        },
        destinationStore: {
            model: 'Spm.model.Queue'
        }
    },

    data: {
        team: null,
        initialQueueIds: [],
        currentQueueIds: [],
        acceptButtonDisabled: false
    },

    formulas: {
        acceptButtonDefaultDisabled: {
            bind: {
                initial: '{initialQueueIds}',
                current: '{currentQueueIds}'
            },
            get: function (ids) {
                return Ext.Array.equals(ids.initial, ids.current)
            }
        }
    }
});