Ext.define('Spm.view.application.LoginWindow', {
    extend: 'Spm.view.StandardDialog',
    alias: 'widget.loginWindow',

    height: 135,
    width: 372,
    layout: {
        type: 'fit'
    },
    closable: false,
    iconCls: 'icon-lock',
    title: 'Login',
    defaultFocus: 'usernameField',
    modal: true,

    initComponent: function () {
        var me = this;

        Ext.apply(me, {
            collectFn: this.getFormContents,
            acceptButtonText: 'Login',
            acceptButtonDefaultDisabled: true,
            cancelButtonText: 'Reset',
            content: {
                xtype: 'form',
                height: 119,
                width: 333,
                bodyPadding: 10,
                frameHeader: false,
                header: false,
                listeners: {
                    validitychange: { fn: me.onValidityChange, scope: me}
                },
                defaults: {
                    listeners: {
                        specialkey: me.onSpecialKey,
                        scope: me
                    }
                },
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
                    }
                ]
            }
        });

        me.callParent(arguments);
    },

    onSpecialKey: function(field, e) {
        if (e.getKey() === e.ENTER) {
            this.onAccept();
        }
    },

    onValidityChange: function(form, valid) {
        this.setAcceptButtonDisabled(!valid);
    },

    onAccept: function () {
        if (this.formPanel().isValid()) {
            this.callParent();
        }
    },

    onCancel: function () {
        this.formPanel().getForm().reset();
    },

    getFormContents: function () {
        var form = this.formPanel().getForm();
        return {'username': form.findField('username').getValue(), 'password': form.findField('password').getValue()};
    },

    formPanel: function () {
        return this.down('form');
    }
});