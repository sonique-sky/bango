Ext.define('Spm.controller.action.serviceproblem.FilterHistoryAction', {
    extend: 'Spm.controller.action.BaseAction',
    alternateClassName: 'Spm.action.FilterHistoryAction',

    statics: {
        ACTION_NAME: 'filter-history'
    },

    constructor: function () {
        this.callParent([{
            name: Spm.action.FilterHistoryAction.ACTION_NAME,
            tooltip: 'Filter history by type',
            iconCls: 'icon-filter-events',
            id: Ext.id(this, 'filter-history-')
        }]);
    }

});
