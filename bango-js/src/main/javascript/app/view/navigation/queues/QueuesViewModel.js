Ext.define('Spm.view.navigation.queues.QueuesViewModel', {
        extend: 'Ext.app.ViewModel',
        alias: 'viewmodel.myQueues',

        stores: {
            agentQueues: {
                type: 'agentQueues'
            }
        }

    }
);