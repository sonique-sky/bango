Ext.define('Spm.view.Superman', {
    extend: 'Ext.container.Viewport',
    alias: 'widget.superman',

    requires: [
        'Spm.store.AuthenticatedAgent',
        'Spm.view.SupermanViewController',
        'Spm.view.SupermanViewModel',
        'Spm.view.container.AppContainer',
        'Spm.view.container.AppContainerViewModel',
        'Spm.view.container.AppContainerViewController'
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