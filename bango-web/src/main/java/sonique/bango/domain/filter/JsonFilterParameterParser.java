package sonique.bango.domain.filter;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.common.base.Throwables;
import org.springframework.core.convert.converter.Converter;
import sky.sns.spm.web.spmapp.shared.dto.Filter;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public final class JsonFilterParameterParser implements Converter<String, List<Filter>> {
    private final ObjectMapper objectMapper;

    public JsonFilterParameterParser(ObjectMapper jsonObjectMapper) {
        this.objectMapper = jsonObjectMapper;
    }

    @Override
    public List<Filter> convert(String source) {
        List<Filter> filters = new ArrayList<>();
        try {
            objectMapper
                    .readTree(source).iterator()
                    .forEachRemaining(node -> filters.add(new Filter(node.get("property").asText(), node.get("value").asText())));
        } catch (IOException e) {
            Throwables.propagate(e);
        }
        return filters;
    }
}
