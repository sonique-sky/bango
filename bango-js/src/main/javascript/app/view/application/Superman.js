Ext.define('Spm.view.application.Superman', {
    extend: 'Ext.container.Viewport',
    alias: 'widget.superman',

    requires: [
        'Spm.view.application.SupermanViewController',
        'Spm.view.application.SupermanViewModel',
        'Spm.view.application.container.AppContainer'
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