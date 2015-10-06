Ext.define('Spm.view.filtered.FilteredServiceProblemsViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.filteredServiceProblems',

    requires: [
        'Spm.store.ServiceProblems'
    ],

    stores: {
        filteredServiceProblems: {
            type: 'serviceProblems'
        }
    },

    data: {
        queue: null,
        bulkTransferDisabled: true,
        bulkClearDisabled: true
    },

    queueId: function () {
        return this.get('queue').get('id');
    }

});
