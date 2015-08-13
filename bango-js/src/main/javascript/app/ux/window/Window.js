/*
    Makes window render the document body which causes modal windows which extend this class to mask the entire viewport, instead of just their parent container.
 */
Ext.define('Ux.window.Window', {
    extend: 'Ext.window.Window',

    initComponent: function() {
        this.renderTo = Ext.getBody();
        this.callParent(arguments);
    }
});