Ext.define('Spm.view.component.dialog.StandardDialog', {
    alternateClassName: 'Spm.component.StandardDialog',
    extend: 'Ux.window.Window',

    layout: {
        type: 'fit'
    },
    modal: true,
    resizable: false,

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