Ext.define('Spm.controller.action.serviceproblem.ShowNotesOnlyAction', {
    extend: 'Spm.controller.action.BaseAction',
    alternateClassName: 'Spm.action.ShowNotesOnlyAction',

    statics: {
        ACTION_NAME: 'show-notes-only'
    },

    filterOn: false,

    constructor: function () {
        this.callParent([
            {
                name: Spm.action.ShowNotesOnlyAction.ACTION_NAME,
                tooltip: 'Show notes only',
                iconCls: 'icon-show-notes-only',
                id: Ext.id(this, 'show-notes-only-')
            }
        ]);
    },

    startAction: function (serviceProblemTab) {
        if (this.filterOn) {
            serviceProblemTab.eventHistoryPanel.removeEventHistoryFilter();
            this.filterOn = false;
            this.setTooltip('Show notes only');
        } else {
            serviceProblemTab.eventHistoryPanel.filterEventHistoryBy(function (eventHistoryItem) {
                return eventHistoryItem.get('eventType') == 'Note'
            });
            this.addCls("x-btn-default-toolbar-small-pressed");
            this.setTooltip('Show all history');
            this.filterOn = true;
        }
    },

    addCls: function (cls) {
        this.each(function (item) {
            item.addCls(cls);
        }, this);
    }
});
