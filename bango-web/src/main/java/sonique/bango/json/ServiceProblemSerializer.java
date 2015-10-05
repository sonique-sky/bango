package sonique.bango.json;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;
import sky.sns.spm.domain.model.serviceproblem.DomainServiceProblem;

import java.io.IOException;

public class ServiceProblemSerializer extends JsonSerializer<DomainServiceProblem> {

    @Override
    public void serialize(DomainServiceProblem serviceProblem, JsonGenerator jsonGenerator, SerializerProvider serializerProvider) throws IOException {
        jsonGenerator.writeStartObject();
        jsonGenerator.writeObjectField("serviceProblemId", serviceProblem.serviceProblemId());
        jsonGenerator.writeObjectField("status", serviceProblem.getStatus());
        jsonGenerator.writeObjectField("directoryNumber", serviceProblem.getDirectoryNumber());
        jsonGenerator.writeObjectField("snsServiceId", serviceProblem.serviceId());
        jsonGenerator.writeObjectField("serviceType", serviceProblem.getServiceType());
        jsonGenerator.writeObjectField("assignmentCode", serviceProblem.getAssignmentCode());
        jsonGenerator.writeObjectField("endUserInformation", serviceProblem.getEndUserInformation());
        jsonGenerator.writeObjectField("operatorReference", serviceProblem.operatorReference());
        jsonGenerator.writeStringField("problem", serviceProblem.problem().description());
        jsonGenerator.writeObjectField("assuranceViewUri", serviceProblem.assuranceViewUri());
        jsonGenerator.writeObjectField("resolution", serviceProblem.getResolution());
        jsonGenerator.writeBooleanField("hasActiveTroubleReport", serviceProblem.hasActiveTroubleReport());
        jsonGenerator.writeObjectField("openedDate", serviceProblem.openedDate());
        jsonGenerator.writeObjectField("closedDate", serviceProblem.closedDate());
        jsonGenerator.writeBooleanField("isManagedLineTestRequested", serviceProblem.isManagedLineTestRequested());

        if (serviceProblem.hasWorkItem()) {
            jsonGenerator.writeNumberField("workItemId", serviceProblem.serviceProblemId().asLong());
            jsonGenerator.writeObjectField("workItem", serviceProblem.workItem());
        } else {
            jsonGenerator.writeNullField("workItemId");
            jsonGenerator.writeNullField("workItem");
        }

        jsonGenerator.writeObjectField("queue", serviceProblem.getQueue());
        jsonGenerator.writeEndObject();
    }
}
