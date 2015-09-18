package sonique.bango.domain.sorter;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.common.base.Throwables;
import org.springframework.core.convert.converter.Converter;
import sky.sns.spm.web.spmapp.shared.dto.SortDescriptor;

import java.io.IOException;

import static sky.sns.spm.web.spmapp.shared.dto.SortDirection.fromAttributeValue;

public final class JsonSortParameterParser implements Converter<String, SortDescriptor> {
    private final ObjectMapper objectMapper;

    public JsonSortParameterParser(ObjectMapper jsonObjectMapper) {
        this.objectMapper = jsonObjectMapper;
    }

    @Override
    public SortDescriptor convert(String source) {
        try {
            JsonNode jsonNode = objectMapper.readTree(source);
            return new SortDescriptor(jsonNode.get("property").asText(), fromAttributeValue(jsonNode.get("direction").asText()));
        } catch (IOException e) {
            throw Throwables.propagate(e);
        }
    }

}
