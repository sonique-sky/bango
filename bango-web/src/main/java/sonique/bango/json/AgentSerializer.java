package sonique.bango.json;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;
import sky.sns.spm.domain.model.DomainAgent;
import sky.sns.spm.domain.model.DomainTeam;

import java.io.IOException;

public class AgentSerializer extends JsonSerializer<DomainAgent> {
    @Override
    public void serialize(DomainAgent agent, JsonGenerator jsonGenerator, SerializerProvider serializerProvider) throws IOException {
        jsonGenerator.writeStartObject();
        jsonGenerator.writeStringField("code", agent.getAgentCode());
        jsonGenerator.writeObjectField("details", agent.details());
        DomainTeam team = agent.team();
        if (team == null) {
            jsonGenerator.writeObjectFieldStart("team");
            jsonGenerator.writeEndObject();
        } else {
            jsonGenerator.writeObjectField("team", team);
        }
        jsonGenerator.writeObjectField("role", agent.getRole());
        jsonGenerator.writeEndObject();
    }
}
