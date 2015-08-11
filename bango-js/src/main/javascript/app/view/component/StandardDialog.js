Ext.define('Spm.view.component.StandardDialog', {
    extend: 'Ext.window.Window',

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
                    id: 'accept-button',
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
                    id: 'cancel-button',
                    width: 80,
                    bind: {
                        text: '{cancelButtonText}'
                    },
                    handler: 'onCancel'
                }
            ]
        }
    ]

});