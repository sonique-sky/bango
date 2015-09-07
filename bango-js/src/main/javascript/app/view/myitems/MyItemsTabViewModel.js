Ext.define('Spm.view.myitems.MyItemsTabViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.myItems',

    stores: {
        myItems: {
            type: 'myItems'
        }
    }
});