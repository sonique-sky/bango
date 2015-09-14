Ext.define('Spm.view.navigation.queues.MyQueuesViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.myQueues',

    requires: [
        'Spm.model.Queue'
    ],

    stores: {
        agentQueues: {
            model: 'Spm.model.Queue'
        }
    }
});