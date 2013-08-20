Ext.define('Spm.proxy.SpmAjaxProxy', {
    extend: 'Ext.data.proxy.Ajax',
    alias: 'proxy.spmAjaxProxy',
    
	constructor: function(cfg) {
		var me = this;
		cfg = cfg || {};
		me.callParent([Ext.apply({
			listeners: {
				exception: {
					fn: me.onProxyException,
					scope: me
				}
			}
		}, cfg)]);
    },
    
    onProxyException: function(proxy, response, operation, eOpts) {
		Spm.application.fireEvent('authenticationRequired', response);
	}
});