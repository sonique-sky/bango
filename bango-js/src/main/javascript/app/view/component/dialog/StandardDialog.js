Ext.define('Spm.view.component.dialog.StandardDialog', {
    alternateClassName: 'Spm.component.StandardDialog',
    extend: 'Ext.window.Window',

    requires: [
        'Ext.button.Button',
        'Ext.container.Container',
        'Ext.layout.container.Fit',
        'Ext.layout.container.HBox',
        'Ext.toolbar.Spacer',
        'Spm.view.component.dialog.StandardDialogViewController',
        'Spm.view.component.dialog.StandardDialogViewModel'
    ],

    initComponent: function () {
        this.renderTo = Ext.getBody();
        this.callParent(arguments);
    },

    layout: {
        type: 'fit'
    },
    modal: true,
    resizable: false,
    closable: false,

    defaultFocus: 'cancelButton',

    viewModel: {type: 'standardDialog'},
    controller: 'standardDialog',

    dockedItems: [
        {
            xtype: 'container',
            layout: {
                pack: 'end',
                type: 'hbox'
            },
            width: '100%',
            padding: {
                top: 5,
                right: 0,
                bottom: 5
            },
            dock: 'bottom',
            items: [
                {
                    xtype: 'button',
                    reference: 'acceptButton',
                    width: 80,
                    bind: {
                        text: '{acceptButtonText}',
                        disabled: '{acceptButtonDefaultDisabled}'
                    },
                    handler: 'onAccept'
                },
                {
                    xtype: 'tbspacer',
                    width: 5
                },
                {
                    xtype: 'button',
                    reference: 'cancelButton',
                    itemId: 'cancelButton',
                    width: 80,
                    bind: {
                        text: '{cancelButtonText}',
                        hidden: '{cancelButtonHidden}'
                    },
                    handler: 'onCancel'
                }
            ]
        }
    ]
});