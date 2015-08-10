Ext.define('Spm.view.application.LoginDialog', {
    extend: 'Spm.view.component.StandardDialog',
    alias: 'widget.loginDialog',

    requires: [
        'Spm.view.component.StandardDialog',
        'Spm.view.application.LoginDialogViewModel',
        'Spm.view.application.LoginDialogViewController',
        'Ux.form.field.Text'
    ],

    height: 135,
    width: 372,

    controller: 'loginDialog',
    viewModel: {type: 'loginDialog'},

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
                    specialkey: 'onSpecialKey'
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
                        value: '{username}'
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
                        value: '{password}'
                    }
                }
            ]
        }
    ]
});