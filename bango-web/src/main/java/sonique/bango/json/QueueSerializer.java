package sonique.bango.json;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;
import sky.sns.spm.domain.model.EventHistoryItem;
import sky.sns.spm.domain.model.refdata.Queue;

import java.io.IOException;

public class QueueSerializer extends JsonSerializer<Queue> {
    @Override
    public void serialize(Queue queue, JsonGenerator jsonGenerator, SerializerProvider serializerProvider) throws IOException, JsonProcessingException {
        jsonGenerator.writeStartObject();
        jsonGenerator.writeNumberField("id", queue.id().asInteger());
        jsonGenerator.writeStringField("name", queue.name().asString());
        jsonGenerator.writeEndObject();

    }
}
