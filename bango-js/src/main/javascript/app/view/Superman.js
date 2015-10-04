Ext.define('Spm.view.Superman', {
    extend: 'Ext.container.Viewport',
    alias: 'widget.superman',

    requires: [
        'Ext.layout.container.Fit',
        'Spm.view.SupermanViewController',
        'Spm.view.SupermanViewModel'
    ],

    controller: 'superman',
    viewModel: {type: 'superman'},

    listeners: {
        beforeRender: 'loadAuthenticatedAgent'
    },

    itemId: 'spmViewport',
    layout: {
        type: 'fit'
    }

});
