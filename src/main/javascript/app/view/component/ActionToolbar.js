Ext.define('Spm.view.component.ActionToolbar', {
    extend: 'Ext.toolbar.Toolbar',
    alias: 'widget.actionToolbar',

    requires: [
        'Ext.toolbar.Paging',
        'Spm.view.component.ActionButton'
    ]
});