package sonique.bango.json;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;
import sky.sns.spm.domain.model.EventHistoryItem;

import java.io.IOException;
import java.text.SimpleDateFormat;

import static org.apache.commons.lang.StringUtils.trimToEmpty;

public class EventHistoryItemSerializer extends JsonSerializer<EventHistoryItem> {
    @Override
    public void serialize(EventHistoryItem eventHistoryItem, JsonGenerator jsonGenerator, SerializerProvider serializerProvider) throws IOException {
        jsonGenerator.writeStartObject();
        jsonGenerator.writeStringField("eventType", eventHistoryItem.type().description());
        jsonGenerator.writeStringField("note", trimToEmpty(eventHistoryItem.note()));

        jsonGenerator.writeObjectField("createdDate", eventHistoryItem.createdDate());
        jsonGenerator.writeStringField("createdBy", eventHistoryItem.createdBy());
        jsonGenerator.writeEndObject();
    }
}
