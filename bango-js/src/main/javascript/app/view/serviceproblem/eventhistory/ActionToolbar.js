Ext.define('Spm.view.serviceproblem.eventhistory.ActionToolbar', {
    extend: 'Ext.toolbar.Toolbar',
    alias: 'widget.eventHistoryActionToolbar',
    cls: 'event-history-action-toolbar',

    ui: 'custom-tool',

    initComponent: function () {
        Ext.applyIf(this, {
            border: false,
            padding: 0,
            defaults: {padding: '1 5 1 5'},
            items: [
                this.registeredActions.actionNamed(Spm.action.ShowNotesOnlyAction.ACTION_NAME),
                this.registeredActions.actionNamed(Spm.action.AddNoteAction.ACTION_NAME),
                this.registeredActions.actionNamed(Spm.action.RefreshEventHistoryAction.ACTION_NAME),
                this.registeredActions.actionNamed(Spm.action.FilterHistoryAction.ACTION_NAME)
            ]
        });

        this.callParent(arguments);
    }
});
