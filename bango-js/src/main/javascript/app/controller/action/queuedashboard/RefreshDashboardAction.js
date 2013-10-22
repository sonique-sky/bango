Ext.define('Spm.controller.action.queuedashboard.RefreshDashboardAction', {
    extend: 'Spm.controller.action.BaseAction',
    alternateClassName: 'Spm.action.RefreshDashboardAction',

    statics: {
        ACTION_NAME: 'refresh-dashboard'
    },

    constructor: function () {
        this.callParent([
            {
                name: Spm.action.RefreshDashboardAction.ACTION_NAME,
                tooltip: 'Refresh',
                text: 'Refresh',
                iconCls: 'icon-reload',
                menu: [
                    { text: 'Disabled', checked: true, group: 'refresh', checkHandler: this.refresh},
                    { text: '1 Minute', checked: false, group: 'refresh', checkHandler: this.refresh},
                    { text: '5 Minute', checked: false, group: 'refresh', checkHandler: this.refresh}
                ]
            }
        ]);
    },

    startAction: function (actionContext) {
    },

    finishAction: function (actionContext) {
    },

    updateState: function (actionContext) {
    },

    refresh: function(item) {

    }
});