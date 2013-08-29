Ext.define('Spm.view.StandardDialog', {
    extend: 'Ext.window.Window',
    alias: 'widget.standardDialog',

    id: 'die-die-die',
    layout: {
        type: 'vbox'
    },
    modal: true,
    resizable: false,

    acceptButtonText: 'OK',
    cancelButtonText: 'Cancel',


    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
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
                            id: 'ok-button',
                            width: 80,
                            text: me.acceptButtonText
                        },
                        {
                            xtype: 'tbspacer',
                            width: 5
                        },
                        {
                            xtype: 'button',
                            id: 'cancel-button',
                            width: 80,
                            text: me.cancelButtonText
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    },

})
;