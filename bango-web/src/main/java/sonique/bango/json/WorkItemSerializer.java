package sonique.bango.json;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;
import sky.sns.spm.domain.model.DomainAgent;
import sky.sns.spm.domain.model.serviceproblem.DomainWorkItem;

import java.io.IOException;

public class WorkItemSerializer extends JsonSerializer<DomainWorkItem> {

    @Override
    public void serialize(DomainWorkItem workItem, JsonGenerator jsonGenerator, SerializerProvider serializerProvider) throws IOException {
        jsonGenerator.writeStartObject();
        jsonGenerator.writeNumberField("workItemId", workItem.workItemId());
        jsonGenerator.writeStringField("status", workItem.status().name());
        jsonGenerator.writeStringField("assignmentType", workItem.assignmentType().name());
        jsonGenerator.writeStringField("action", workItem.action().name());
        jsonGenerator.writeStringField("priority", workItem.priority().name());
        jsonGenerator.writeObjectField("createdDate", workItem.createdDate());
        jsonGenerator.writeObjectField("reminderTime", workItem.reminderTime());

        if(workItem.isAssigned()) {
            DomainAgent agent = workItem.agent();

            jsonGenerator.writeStringField("agentCode", agent.getAgentCode());
            jsonGenerator.writeFieldName("agent");

            JsonSerializer<Object> agentSerializer = serializerProvider.findTypedValueSerializer(DomainAgent.class, false, null);
            agentSerializer.serialize(agent, jsonGenerator, serializerProvider);
        }

        jsonGenerator.writeEndObject();
    }
}
