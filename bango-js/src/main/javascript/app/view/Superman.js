Ext.define('Spm.view.Superman', {
    extend: 'Ext.container.Viewport',
    alias: 'widget.superman',

    requires: [
        'Spm.view.SupermanViewController',
        'Spm.view.SupermanViewModel',
        'Spm.view.container.AppContainer'
    ],

    controller: 'superman',
    viewModel: {type: 'superman'},
    reference: 'superman',

    itemId: 'spmViewport',
    layout: {
        type: 'fit'
    },

    items: [
        {
            xtype: 'appContainer'
        }
    ]
});