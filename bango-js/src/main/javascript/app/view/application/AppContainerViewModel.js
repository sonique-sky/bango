Ext.define('Spm.view.application.AppContainerViewModel', {
        extend: 'Ext.app.ViewModel',
        alias: 'viewmodel.appContainer',

        data: {
            activeQueueTabs: Ext.create('Ext.util.MixedCollection')
        },

        containsQueueTabForId: function(queueId) {
            return this.get('activeQueueTabs').containsKey(queueId);
        },

        addQueueTab: function(queueId) {
            this.get('activeQueueTabs').add(queueId, queueId);
        }
    }
);