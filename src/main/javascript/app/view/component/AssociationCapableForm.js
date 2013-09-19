Ext.define('Spm.view.component.AssociationCapableForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.associationCapableForm',

    loadRecord: function (record) {
        this.callParent(arguments);

        this.loadAssociatedData(record);
    },

    loadAssociatedData: function (record) {
        var me = this;

        Ext.Array.forEach(record.associations.items, function (association) {
            var associationGetter = association.getterName;
            var associationRecord = record[associationGetter]();
            var associationFields = me.query('[name^=' + association.name + '.]');

            Ext.Array.forEach(associationFields, function (field) {
                var nameTokens = field.name.split('.');

                var nameToken = nameTokens[1];
                var val = associationRecord.get(nameToken);
                field.setValue(val);
                if (me.trackResetOnLoad) {
                    field.resetOriginalValue();
                }
            });
        })
    }
});