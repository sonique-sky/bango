package sonique.bango.json;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;
import sky.sns.spm.domain.model.serviceproblem.WorkItemAction;

import java.io.IOException;

public class WorkItemActionSerializer extends JsonSerializer<WorkItemAction> {
    @Override
    public void serialize(WorkItemAction action, JsonGenerator jsonGenerator, SerializerProvider serializerProvider) throws IOException {
        jsonGenerator.writeStartObject();
        jsonGenerator.writeStringField("name", action.name());
        jsonGenerator.writeStringField("description", action.getDescription());
        jsonGenerator.writeEndObject();
    }
}
