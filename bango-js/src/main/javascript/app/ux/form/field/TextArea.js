Ext.define('Ux.form.field.TextArea', {
    extend: 'Ext.form.field.TextArea',
    alias: 'widget.textareafield',
    //Override publish value so that it also will publish invalid values
    publishValue: function () {
        var me = this;
        if (me.rendered) {
            me.publishState('value', me.getValue());
        }
    }
});