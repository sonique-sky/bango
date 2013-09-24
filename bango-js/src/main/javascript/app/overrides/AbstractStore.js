Ext.define('Spm.overrides.AbstractStore', {
    override: 'Ext.data.AbstractStore',

    operationFactory: undefined,

    /**
     * Loads the Store using its configured {@link #proxy}.
     * @param {Object} options (optional) config object. This is passed into the {@link Ext.data.Operation Operation}
     * object that is created and then sent to the proxy's {@link Ext.data.proxy.Proxy#read} function
     *
     * @return {Ext.data.Store} this
     * @since 1.1.0
     */
    load: function (options) {
        var me = this,
                operation;

        options = Ext.apply({
            action: 'read',
            filters: me.filters.items,
            sorters: me.getSorters()
        }, options);
        me.lastOptions = options;

        // Override: Use operationFactory method to get the Operation if possible
        if (this.operationFactory) {
            operation = this.operationFactory(options);
        } else {
            operation = new Ext.data.Operation(options);
        }
        // End Override

        if (me.fireEvent('beforeload', me, operation) !== false) {
            me.loading = true;
            me.proxy.read(operation, me.onProxyLoad, me);
        }

        return me;
    }
});