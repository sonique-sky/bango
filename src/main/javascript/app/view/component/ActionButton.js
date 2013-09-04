Ext.define('Spm.view.component.ActionButton', {
    extend: 'Ext.button.Button',
    alias: 'widget.actionButton',

    config: {
        actionName: undefined
    },

    statics: {
        toolBarButton: function (identifier, idSuffix, scope, toolTip) {
            return Ext.widget('actionButton', {
                id: identifier + '-' + idSuffix,
                iconCls: 'icon-' + identifier,
                handler: scope.startAction,
                scope: scope,
                actionName: identifier,
                tooltip: toolTip
            });
        }
    }
});