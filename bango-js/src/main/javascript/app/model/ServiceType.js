Ext.define('Spm.model.ServiceType', {
    extend: 'Ext.data.Model',
    alias: 'model.serviceType',

    idProperty: 'name',

    fields: [
        {name: 'name', critical: true},
        {name: 'displayName'}
    ],

    displayName: function () {
        return this.get('displayName');
    }

});
