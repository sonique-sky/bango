Ext.define('Spm.view.StandardDialog', {
    extend: 'Ext.window.Window',
    alias: 'widget.standardDialog',

    id: 'die-die-die',
    layout: {
        type: 'vbox'
    },
    modal: true,
    resizable: false,

    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
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
                            text: 'Ok'
                        },
                        {
                            xtype: 'tbspacer',
                            width: 5
                        },
                        {
                            xtype: 'button',
                            id: 'cancel-button',
                            width: 80,
                            text: 'Cancel'
                        }
                    ]
                }
            ],
            items: [
                {
                    xtype: 'container',
                    layout: 'fit',
                    flex: 1,
                    width: '100%',
                    items: [me.content]
                }
            ]
        });

        me.callParent(arguments);
    }

})
;