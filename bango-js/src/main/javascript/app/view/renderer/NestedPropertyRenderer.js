Ext.define('Spm.view.renderer.NestedPropertyRenderer', {
    statics: {
        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
            function evaluateMe(dataIndex, associatedData) {
                var properties = dataIndex.split('.');
                var value = associatedData;

                Ext.Array.each(properties, function (property) {
                    value = value[property]

                    // Stop the iteration if value is null
                    if(!value) {
                        return false;
                    }
                });

                return value;
            }

            var gridPanel = view.up('gridpanel');
            // Hack cos Ext offsets the colIndex value if selType property is 'checkboxmodel'
            if (gridPanel.selModel.selType == 'checkboxmodel') {
                colIndex--;
            }
            // End Hack
            var column = gridPanel.columns[colIndex];

            return evaluateMe(column.dataIndex, record.getAssociatedData());
        }
    }
});