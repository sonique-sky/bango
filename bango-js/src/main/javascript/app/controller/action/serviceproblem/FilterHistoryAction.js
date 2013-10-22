Ext.define('Spm.controller.action.serviceproblem.FilterHistoryAction', {
    extend: 'Spm.controller.action.BaseAction',
    alternateClassName: 'Spm.action.FilterHistoryAction',

    statics: {
        ACTION_NAME: 'filter-history'
    },

    requires: [
        'Spm.view.serviceproblem.eventhistory.FilterEventHistoryDialog'
    ],


    constructor: function () {
        this.callParent([
            {
                name: Spm.action.FilterHistoryAction.ACTION_NAME,
                tooltip: 'Filter history by type',
                iconCls: 'icon-filter-events',
                id: Ext.id(this, 'filter-history-')

            }
        ])
        ;
    },

    startAction: function (serviceProblemTab) {

        var eventTypes = [];
        serviceProblemTab.eventHistoryPanel.store.each(function (historyItem) {
            var eventType = historyItem.get('eventType');
            if (!Ext.Array.contains(eventTypes, eventType)) {
                eventTypes.push([eventType]);
            }
        });

        var store = Ext.create('Ext.data.ArrayStore', {
            storeId: 'eventNameStore',
            fields: ['eventType']
        });

        store.loadData(eventTypes);

        Ext.create('Spm.view.serviceproblem.eventhistory.FilterEventHistoryDialog', {actionName: this.name, actionContext: serviceProblemTab, store: store}).show();
    }

})
;
