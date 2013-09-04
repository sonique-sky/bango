Ext.define('Spm.view.component.StandardDialog', {
    extend: 'Ext.window.Window',

    layout: {
        type: 'fit'
    },
    modal: true,
    resizable: false,

    acceptButtonText: 'OK',
    cancelButtonText: 'Cancel',
    acceptButtonDefaultDisabled: false,

    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            collectFn: me.collectFn || Ext.emptyFn,
            items: me.content,
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

    setAcceptButtonDisabled: function(disabled) {
        this.down('#accept-button').setDisabled(disabled);
    },

    onAccept: function() {
        var eventArguments = this.collectFn();
        eventArguments.unshift('accepted');

        this.fireEvent.apply(this, eventArguments);
        this.close();
    },

    onCancel: function() {
        this.close();
    }
});