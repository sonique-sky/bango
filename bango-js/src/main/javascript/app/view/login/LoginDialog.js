Ext.define('Spm.view.login.LoginDialog', {
    extend: 'Spm.component.StandardDialog',
    alias: 'widget.loginDialog',

    requires: [
        'Spm.view.login.LoginDialogViewModel',
        'Spm.view.login.LoginDialogViewController'
    ],

    height: 135,
    width: 372,

    controller: 'loginDialog',
    viewModel: 'loginDialog',

    closable: false,
    draggable: false,
    iconCls: 'icon-lock',
    cls: 'spm-login-dialog',
    title: 'Please Login',
    defaultFocus: 'usernameField',
    modal: true,

    items: [
        {
            xtype: 'form',
            reference: 'loginForm',
            height: 119,
            width: 333,
            bodyPadding: 10,
            frameHeader: false,
            header: false,
            defaults: {
                listeners: {
                    specialkey: 'submitOnEnter'
                }
            },
            items: [
                {
                    xtype: 'textfield',
                    anchor: '100%',
                    id: 'username',
                    itemId: 'usernameField',
                    fieldLabel: 'Username:',
                    allowBlank: false,
                    bind: {
                        value: '{login.username}'
                    }
                },
                {
                    xtype: 'textfield',
                    anchor: '100%',
                    id: 'password',
                    itemId: 'passwordField',
                    fieldLabel: 'Password:',
                    inputType: 'password',
                    allowBlank: false,
                    bind: {
                        value: '{login.password}'
                    }
                }
            ]
        }
    ]
});