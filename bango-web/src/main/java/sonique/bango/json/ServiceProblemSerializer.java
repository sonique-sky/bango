package sonique.bango.json;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;
import sky.sns.spm.domain.model.serviceproblem.DomainServiceProblem;

import java.io.IOException;

public class ServiceProblemSerializer extends JsonSerializer<DomainServiceProblem> {
    @Override
    public void serialize(DomainServiceProblem domainServiceProblem, JsonGenerator jsonGenerator, SerializerProvider serializerProvider) throws IOException {
        jsonGenerator.writeStartObject();
        jsonGenerator.writeNumberField("serviceProblemId", domainServiceProblem.serviceProblemId().asInteger());
        jsonGenerator.writeStringField("status", domainServiceProblem.getStatus().asString());
        jsonGenerator.writeStringField("directoryNumber", domainServiceProblem.getDirectoryNumber().asString());
        jsonGenerator.writeStringField("snsServiceId", domainServiceProblem.serviceId().asString());
        jsonGenerator.writeBooleanField("hasActiveTroubleReport", domainServiceProblem.hasActiveTroubleReport());

        if (domainServiceProblem.hasWorkItem()) {
            jsonGenerator.writeObjectField("workItem", domainServiceProblem.workItem());
        } else {
            jsonGenerator.writeObjectFieldStart("workItem");
            jsonGenerator.writeObjectFieldStart("agent");
            jsonGenerator.writeEndObject();
            jsonGenerator.writeEndObject();
        }

        jsonGenerator.writeObjectField("queue", domainServiceProblem.getQueue());

        jsonGenerator.writeEndObject();
    }
}
