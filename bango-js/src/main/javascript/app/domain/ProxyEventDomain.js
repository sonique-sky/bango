Ext.define('Spm.domain.ProxyEventDomain', {
    extend: 'Ext.app.EventDomain',
    singleton: true,
    requires: ['Ext.data.proxy.Server'],
    type: 'proxy',
    idProperty: 'type',
    constructor: function() {
        this.callParent();
        this.monitor(Ext.data.proxy.Server);
    }
});