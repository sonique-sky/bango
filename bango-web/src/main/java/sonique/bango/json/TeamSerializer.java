package sonique.bango.json;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.google.common.base.Throwables;
import sky.sns.spm.domain.model.DomainTeam;

import java.io.IOException;

public class TeamSerializer extends JsonSerializer<DomainTeam> {
    private final QueueSerializer queueSerializer = new QueueSerializer();

    @Override
    public void serialize(DomainTeam team, JsonGenerator jsonGenerator, SerializerProvider serializerProvider) throws IOException {
        jsonGenerator.writeStartObject();
        jsonGenerator.writeNumberField("id", team.id().asNumber());
        jsonGenerator.writeStringField("name", team.name().asString());
        jsonGenerator.writeFieldName("assignedQueues");
        jsonGenerator.writeStartArray();
        team.assignedQueues().forEach((queue) -> {
            try {
                queueSerializer.serialize(queue, jsonGenerator, serializerProvider);
            } catch (IOException e) {
                throw Throwables.propagate(e);
            }
        });
        jsonGenerator.writeEndArray();
        jsonGenerator.writeEndObject();
    }
}
