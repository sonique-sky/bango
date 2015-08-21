package sonique.bango.json;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;
import sky.sns.spm.domain.model.serviceproblem.DomainServiceProblem;
import sky.sns.spm.domain.model.serviceproblem.DomainWorkItem;
import sky.sns.spm.domain.model.serviceproblem.EndUserInformation;
import sky.sns.spm.domain.model.serviceproblem.ServiceProblemResolution;

import java.io.IOException;

public class ServiceProblemSerializer extends JsonSerializer<DomainServiceProblem> {

    @Override
    public void serialize(DomainServiceProblem serviceProblem, JsonGenerator jsonGenerator, SerializerProvider serializerProvider) throws IOException {
        jsonGenerator.writeStartObject();
        jsonGenerator.writeNumberField("serviceProblemId", serviceProblem.serviceProblemId().asInteger());
        jsonGenerator.writeStringField("status", serviceProblem.getStatus().asString());
        jsonGenerator.writeStringField("directoryNumber", serviceProblem.getDirectoryNumber().asString());
        jsonGenerator.writeStringField("snsServiceId", serviceProblem.serviceId().asString());
        jsonGenerator.writeObjectField("serviceType", serviceProblem.getServiceType());
        writeEndUserInformation(jsonGenerator, serviceProblem.getEndUserInformation());
        jsonGenerator.writeStringField("operatorReference", serviceProblem.operatorReference().asString());
        jsonGenerator.writeStringField("problem", serviceProblem.problem().description());
        writeResolution(jsonGenerator, serviceProblem.getResolution());

        jsonGenerator.writeBooleanField("hasActiveTroubleReport", serviceProblem.hasActiveTroubleReport());

        jsonGenerator.writeObjectField("openedDate", serviceProblem.openedDate());
        jsonGenerator.writeObjectField("closedDate", serviceProblem.closedDate());

        if (serviceProblem.hasWorkItem()) {
            jsonGenerator.writeNumberField("workItemId", serviceProblem.serviceProblemId().asLong());

            jsonGenerator.writeFieldName("workItem");

            DomainWorkItem workItem = serviceProblem.workItem();
            JsonSerializer<Object> workItemSerializer = serializerProvider.findTypedValueSerializer(DomainWorkItem.class, false, null);
            workItemSerializer.serialize(workItem, jsonGenerator, serializerProvider);
        } else {
            jsonGenerator.writeObjectFieldStart("workItem");
            jsonGenerator.writeObjectFieldStart("agent");
            jsonGenerator.writeEndObject();
            jsonGenerator.writeEndObject();
        }

        jsonGenerator.writeObjectField("queue", serviceProblem.getQueue());

        jsonGenerator.writeEndObject();
    }

    private void writeResolution(JsonGenerator jsonGenerator, ServiceProblemResolution resolution) throws IOException {
        if (resolution != null) {
            jsonGenerator.writeObjectFieldStart("resolution");
            jsonGenerator.writeStringField("fault", resolution.getFault().description());
            jsonGenerator.writeStringField("cause", resolution.getCause().description());
            jsonGenerator.writeStringField("resolutionReason", resolution.getResolutionReason().description());
            jsonGenerator.writeEndObject();
        }
    }

    private void writeEndUserInformation(JsonGenerator jsonGenerator, EndUserInformation endUserInformation) throws IOException {
        jsonGenerator.writeObjectFieldStart("endUserInformation");
        jsonGenerator.writeStringField("preferredContactNumber", endUserInformation.getPreferredContactNumber());
        jsonGenerator.writeStringField("name", endUserInformation.getName());
        jsonGenerator.writeStringField("operatorAccountNumber", endUserInformation.getOperatorAccountNumber());
        jsonGenerator.writeEndObject();
    }
}
