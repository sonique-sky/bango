Ext.define('Spm.view.serviceproblem.mlt.ManagedLineTestDialog', {
    extend: 'Spm.component.StandardDialog',
    alias: 'widget.managedLineTestDialog',

    viewModel: {type: 'managedLineTestDialog'},
    controller: 'managedLineTestDialog',

    title: 'Request Managed Line Test',
    listeners: {
        show: 'onShow'
    },
    height: 275,
    width: 550,
    bodyPadding: 0,
    layout: 'card',
    closable: true,

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
                    reference: 'backButton',
                    width: 80,
                    bind: {
                        text: 'Back',
                        disabled: '{backButtonDisabled}'
                    },
                    handler: 'onBack'
                },
                {
                    xtype: 'tbspacer',
                    width: 5
                },
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