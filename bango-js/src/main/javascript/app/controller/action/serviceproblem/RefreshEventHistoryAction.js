Ext.define('Spm.controller.action.serviceproblem.RefreshEventHistoryAction', {
    extend: 'Spm.controller.action.BaseAction',
    alternateClassName: 'Spm.action.RefreshEventHistoryAction',

    statics: {
        ACTION_NAME: 'refresh-events'
    },

    constructor: function () {
        this.callParent([{
            name: Spm.action.RefreshEventHistoryAction.ACTION_NAME,
            tooltip: 'Refresh history',
            iconCls: 'icon-refresh-history',
            id: Ext.id(this, 'refresh-history-')
        }]);
    },

    startAction: function (serviceProblemTab) {
        serviceProblemTab.eventHistoryPanel.reload();
    }
});

