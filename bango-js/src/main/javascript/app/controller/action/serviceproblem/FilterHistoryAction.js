Ext.define('Spm.controller.action.serviceproblem.FilterHistoryAction', {
    extend: 'Spm.controller.action.BaseAction',
    alternateClassName: 'Spm.action.FilterHistoryAction',

    statics: {
        ACTION_NAME: 'filter-history'
    },

    requires: [
        'Spm.view.serviceproblem.eventhistory.filter.FilterEventHistoryDialog'
    ],


    constructor: function () {
        this.callParent([
            {
                name: Spm.action.FilterHistoryAction.ACTION_NAME,
                tooltip: 'Filter history by type',
                iconCls: 'icon-filter-events',
                id: Ext.id(this, 'filter-history-')

            }
        ]);
    },

    startAction: function (serviceProblemTab) {
        var store = Ext.create('Ext.data.ArrayStore', {
            storeId: 'eventNameStore',
            fields: ['eventType']
        });

        var eventTypes = serviceProblemTab.eventHistoryPanel.allEventTypes();
        var unique = Ext.Array.unique(eventTypes).map(function (eventType) {
            return [eventType];
        });

        store.loadData(unique);

        Ext.create('Spm.view.serviceproblem.eventhistory.FilterEventHistoryDialog', {actionName: this.name, actionContext: serviceProblemTab, store: store}).show();
    },

    finishAction: function (serviceProblemTab, eventTypes) {
        if (eventTypes.length > 0) {
            serviceProblemTab.eventHistoryPanel.filterEventHistoryBy(function (historyItem) {
                return Ext.Array.contains(eventTypes, historyItem.get('eventType'));
            })
        } else {
            serviceProblemTab.eventHistoryPanel.removeEventHistoryFilter();
        }
    }
});