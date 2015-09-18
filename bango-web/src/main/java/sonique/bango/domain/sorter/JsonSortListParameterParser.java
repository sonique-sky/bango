package sonique.bango.domain.sorter;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.common.base.Throwables;
import org.springframework.core.convert.converter.Converter;
import sky.sns.spm.web.spmapp.shared.dto.SortDescriptor;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import static sky.sns.spm.web.spmapp.shared.dto.SortDirection.fromAttributeValue;

public final class JsonSortListParameterParser implements Converter<String, List<SortDescriptor>> {
    private final ObjectMapper objectMapper;

    public JsonSortListParameterParser(ObjectMapper jsonObjectMapper) {
        this.objectMapper = jsonObjectMapper;
    }

    @Override
    public List<SortDescriptor> convert(String source) {
        List<SortDescriptor> sorters = new ArrayList<>();
        try {
            objectMapper
                    .readTree(source).iterator()
                    .forEachRemaining(node -> sorters.add(
                            new SortDescriptor(node.get("property").asText(), fromAttributeValue(node.get("direction").asText()))
                    ));

        } catch (IOException e) {
            throw Throwables.propagate(e);
        }
        return sorters;
    }

}
