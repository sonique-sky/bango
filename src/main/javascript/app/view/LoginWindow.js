Ext.define('Spm.view.LoginWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.loginWindow',

    height: 127,
    width: 372,
    layout: {
        type: 'fit'
    },
    closable: false,
    iconCls: 'icon-lock',
    title: 'Login',
    defaultFocus: 'usernameField',
    modal: true,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'form',
                    height: 119,
                    width: 333,
                    bodyPadding: 10,
                    frameHeader: false,
                    header: false,
                    title: 'Login',
                    items: [
                        {
                            xtype: 'textfield',
                            anchor: '100%',
                            id: 'username',
                            itemId: 'usernameField',
                            fieldLabel: 'Username:',
                            allowBlank: false
                        },
                        {
                            xtype: 'textfield',
                            anchor: '100%',
                            id: 'password',
                            itemId: 'passwordField',
                            fieldLabel: 'Password:',
                            inputType: 'password',
                            allowBlank: false
                        },
                        {
                            xtype: 'container',
                            layout: {
                                pack: 'end',
                                padding: '',
                                type: 'hbox'
                            },
                            items: [
                                {
                                    xtype: 'button',
                                    id: 'reset-button',
                                    text: 'Reset'
                                },
                                {
                                    xtype: 'tbspacer',
                                    width: 5
                                },
                                {
                                    xtype: 'button',
                                    formBind: true,
                                    disabled: true,
                                    id: 'login-button',
                                    text: 'Login'
                                }
                            ]
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    }

});