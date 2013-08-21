Ext.define('Spm.cache.TabCache', {
    alias: 'cache.tabCache',
    
    config: {
        tabPanel: null
    },
    
	constructor: function(cfg) {
		this.initConfig(cfg);
    },
    
    activateTabFor: function(queue) {
        console.log(this.tabPanel);
        
    }
});