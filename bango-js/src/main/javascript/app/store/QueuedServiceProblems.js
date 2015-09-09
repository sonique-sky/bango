Ext.define('Spm.store.QueuedServiceProblems', {
    extend: 'Ext.data.Store',
    alias: 'store.queuedServiceProblems',

    autoLoad: false,
    filterOnLoad: false,
    model: 'Spm.model.ServiceProblem',
    sortOnLoad: false,

    proxy: {
        type: 'queuedServiceProblemsProxy',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }

});