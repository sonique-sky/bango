Ext.define('Spm.store.AllQueues', {
    extend: 'Ext.data.Store',
    alias: 'store.allQueues',
    model: 'Spm.model.Queue',
    filterOnLoad: false,

    requires: [
        'Spm.model.Queue'
    ],

    proxy: {
        type: 'ajax',
        url: 'api/queue/all',
        reader: {
            type: 'json',
            rootProperty: 'onePageOfSearchResults',
            totalProperty: 'totalRecordCount'
        }
    }
});
