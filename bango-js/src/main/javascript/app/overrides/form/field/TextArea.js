Ext.define('Ext.overrides.form.field.TextArea', {
    override: 'Ext.form.field.TextArea',

    //Override publish value so that it also will publish invalid values
    publishValue: function () {
        var me = this;
        if (me.rendered) {
            me.publishState('value', me.getValue());
        }
    }
});