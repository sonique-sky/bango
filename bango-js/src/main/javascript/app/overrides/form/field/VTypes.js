Ext.define('Ext.overrides.form.field.VTypes', {
    override: 'Ext.form.field.VTypes',

    // vtype validation function
    numeric: function(value) {
        return this.numericRe.test(value);
    },
    numericRe: /[\d]/i,
    numericText: 'Not a valid whole number.',
    numericMask: /[\d]/i
});