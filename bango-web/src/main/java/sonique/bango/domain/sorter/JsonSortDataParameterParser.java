package sonique.bango.domain.sorter;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.common.base.Throwables;

import java.beans.PropertyEditorSupport;
import java.io.IOException;
import java.util.Iterator;

public final class JsonSortDataParameterParser extends PropertyEditorSupport {
    private final ObjectMapper jsonMapper;

    public JsonSortDataParameterParser(ObjectMapper jsonObjectMapper) {
        this.jsonMapper = jsonObjectMapper;
    }

    @Override
    public void setAsText(String text) throws IllegalArgumentException {
        try {

            JsonNode root = jsonMapper.readTree(text);
            int nodesCount = root.size();
            Iterator<JsonNode> nodesIterator = root.iterator();

            Sort[] sortDataArray = new Sort[nodesCount];
            for (int i = 0; nodesIterator.hasNext(); i++) {
                JsonNode sortNode = nodesIterator.next();
                sortDataArray[i] = new Sort(sortNode.get("property").asText(), asDirection(sortNode.get("direction").asText()));
            }

            this.setValue(sortDataArray);
        } catch (IOException e) {
            Throwables.propagate(e);
        }
    }

    private static Sort.Direction asDirection(String direction) {
        return Sort.Direction.from(direction);
    }
}
