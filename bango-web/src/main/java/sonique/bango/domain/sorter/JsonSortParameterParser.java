package sonique.bango.domain.sorter;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.common.base.Throwables;
import org.springframework.core.convert.converter.Converter;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public final class JsonSortParameterParser implements Converter<String, List<Sorter>> {
    private final ObjectMapper objectMapper;

    public JsonSortParameterParser(ObjectMapper jsonObjectMapper) {
        this.objectMapper = jsonObjectMapper;
    }

    @Override
    public List<Sorter> convert(String source) {
        List<Sorter> sorters = new ArrayList<>();
        try {
            objectMapper
                    .readTree(source).iterator()
                    .forEachRemaining(node -> sorters.add(new Sorter(node.get("property").asText(), asDirection(node.get("direction").asText()))));
        } catch (IOException e) {
            Throwables.propagate(e);
        }
        return sorters;
    }

    private static Sorter.Direction asDirection(String direction) {
        return Sorter.Direction.from(direction);
    }
}
