package sonique.bango.json;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;
import sky.sns.spm.domain.model.DomainAgent;

import java.io.IOException;

public class AgentSerializer extends JsonSerializer<DomainAgent> {
    @Override
    public void serialize(DomainAgent agent, JsonGenerator jsonGenerator, SerializerProvider serializerProvider) throws IOException {
        jsonGenerator.writeStartObject();
        jsonGenerator.writeStringField("code", agent.getAgentCode());
        jsonGenerator.writeObjectField("details",agent.details());
        jsonGenerator.writeObjectField("team",agent.team());
        jsonGenerator.writeObjectField("role",agent.getRole());
        jsonGenerator.writeEndObject();
    }
}
