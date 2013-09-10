Ext.define('Spm.store.EventHistory', {
    extend: 'Ext.data.Store',
    alias: 'store.eventHistory',
    model: 'Spm.model.EventHistoryItem',
    filterOnLoad: false,

    requires: [
        'Spm.model.EventHistoryItem'
    ],

    proxy: {
        type: 'ajax',
        buildUrl: function(request) {
            return Ext.String.format('api/serviceProblem/{0}/eventHistory', request.params.serviceProblemId);
        },
        reader: {
            type: 'json'
        }
    }
});