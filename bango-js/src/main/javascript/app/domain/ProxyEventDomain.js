Ext.define('Spm.domain.ProxyEventDomain', {
    extend: 'Ext.app.EventDomain',
    singleton: true,
    requires: ['Ext.data.proxy.Server'],
    type: 'proxy',
    idProperty: 'type',
    constructor: function() {
        var me = this;
        me.callParent();
        me.monitor(Ext.data.proxy.Server);
    }
});