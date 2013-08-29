Ext.define('Spm.view.StandardDialog', {
    extend: 'Ext.window.Window',
    alias: 'widget.standardDialog',

    layout: {
        type: 'vbox'
    },
    modal: true,
    resizable: false,

    acceptButtonText: 'OK',
    cancelButtonText: 'Cancel',
    acceptButtonDefaultDisabled: false,

    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            collectFn: me.collectFn,
            items: [
                {
                    xtype: 'container',
                    layout: 'fit',
                    flex: 1,
                    width: '100%',
                    items: [me.content]
                }
            ],
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
                            text: me.acceptButtonText,
                            handler: me.onAccept,
                            scope: me,
                            disabled: me.acceptButtonDefaultDisabled
                        },
                        {
                            xtype: 'tbspacer',
                            width: 5
                        },
                        {
                            xtype: 'button',
                            id: 'cancel-button',
                            width: 80,
                            text: me.cancelButtonText,
                            handler: me.onCancel,
                            scope: me
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    },

    enableAcceptButton: function() {
        this.down('#accept-button').setDisabled(false);
    },

    onAccept: function() {
        this.fireEvent('accepted', this.collectFn());
        this.close();
    },

    onCancel: function() {
        this.close();
    }
});