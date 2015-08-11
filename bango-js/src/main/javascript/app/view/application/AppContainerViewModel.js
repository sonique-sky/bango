Ext.define('Spm.view.application.AppContainerViewModel', {
        extend: 'Ext.app.ViewModel',
        alias: 'viewmodel.appContainer',

        data: {
            activeQueueTabs: Ext.create('Ext.util.MixedCollection')
        },

        activeQueueTabs: function () {
            return this.get('activeQueueTabs');
        },

        queueTabForId: function (queueId) {
            return this.activeQueueTabs().containsKey(queueId) ? this.activeQueueTabs().get(queueId) : null;
        },

        addQueueTab: function (queueId, queueTab) {
            this.activeQueueTabs().add(queueId, queueTab);
        },

        removeTabForId: function(queueId) {
            this.activeQueueTabs().removeAtKey(queueId);
        }
    }
);