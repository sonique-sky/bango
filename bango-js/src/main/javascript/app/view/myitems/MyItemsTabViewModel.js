Ext.define('Spm.view.myitems.MyItemsTabViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.myItemsTab',

    stores: {
        myItems: {
            type: 'myItems'
        }
    }
});