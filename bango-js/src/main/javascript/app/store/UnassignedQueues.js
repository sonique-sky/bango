Ext.define('Spm.store.UnassignedQueues', {
    extend: 'Ext.data.Store',
    alias: 'store.unassignedQueues',

    requires: [
        'Spm.model.Queue',
        'Spm.proxy.UnassignedQueuesProxy'
    ],
    model: 'Spm.model.Queue',

    proxy: {
        type: 'unassignedQueuesProxy'

    }
});