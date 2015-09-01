Ext.define('Spm.store.Queues', {
    extend: 'Ext.data.Store',
    alias: 'store.queues',

    requires: [
        'Spm.model.Queue'
    ],
    model: 'Spm.model.Queue',

    sorters: 'name'
});