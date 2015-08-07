Ext.define('Ux.form.field.Text', {
    extend: 'Ext.form.field.Text',
    alias: 'widget.textfield',
    //Override publish value so that it also will publish invalid values
    publishValue: function () {
        var me = this;
        if (me.rendered) {
            me.publishState('value', me.getValue());
        }
    }
});