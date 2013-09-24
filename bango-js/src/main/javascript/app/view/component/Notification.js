Ext.define('Spm.view.component.Notification', {
    alternateClassName: 'Spm.component.Notification',

    requires: [
        'Ext.ux.window.Notification'
    ],

    statics: {
        info: function (title) {
            var formatArguments = Array.prototype.slice.call(arguments, 1);

            Ext.util.TaskManager.start({
                run: function () {
                    Ext.widget('uxNotification', {
                        position: 'br',
                        cls: 'ux-notification-light',
                        iconCls: 'icon-info-notification',
                        closable: false,
                        title: title,
                        html: Ext.String.format.apply(String, formatArguments),
                        autoCloseDelay: 2000,
                        slideInDuration: 500,
                        slideBackDuration: 1500,
                        slideBackAnimation: 'elasticIn'
                    }).show();

                    return false;
                },
                interval: 1000
            });
        }
    }
});