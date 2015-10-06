Ext.define('Spm.view.component.notification.Notification', {
    extend: 'Ext.Base',
    alternateClassName: 'Spm.Notification',

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
