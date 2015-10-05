Ext.define('Spm.view.component.notification.Notification', {
    alternateClassName: 'Spm.Notification',

    extend: 'Ext.Container',

    statics: {
        notify: function (title, message) {
            new Ext.window.Toast({
                title: title,
                html: message,
                width: 250,
                align: 'br',
                header: true,
                border: false
            }).show();
        }
    }

});
