Ext.define('Ext.overrides.form.field.Text', {
    override: 'Ext.form.field.Text',

    //Override publish value so that it also will publish invalid values
    publishValue: function () {
        var me = this;
        if (me.rendered) {
            me.publishState('value', me.getValue());
        }
    }
});