package sonique.bango.json;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;
import sky.sns.spm.domain.model.refdata.QueueRoutingKey;
import sky.sns.spm.domain.model.serviceproblem.DomainServiceProblem;
import sky.sns.spm.domain.model.serviceproblem.EndUserInformation;
import sky.sns.spm.domain.model.serviceproblem.ServiceProblemResolution;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.ZoneId;

public class ServiceProblemSerializer extends JsonSerializer<DomainServiceProblem> {

    @Override
    public void serialize(DomainServiceProblem serviceProblem, JsonGenerator jsonGenerator, SerializerProvider serializerProvider) throws IOException {
        jsonGenerator.writeStartObject();
        jsonGenerator.writeNumberField("serviceProblemId", serviceProblem.serviceProblemId().asInteger());
        jsonGenerator.writeStringField("status", serviceProblem.getStatus().asString());
        jsonGenerator.writeStringField("directoryNumber", serviceProblem.getDirectoryNumber().asString());
        jsonGenerator.writeStringField("snsServiceId", serviceProblem.serviceId().asString());
        jsonGenerator.writeObjectField("serviceType", serviceProblem.getServiceType());
        jsonGenerator.writeStringField("assignmentCode", serviceProblem.problem().getQueueRouting().keySet().stream().map(QueueRoutingKey::assignmentCode).findFirst().get().asString());
        writeEndUserInformation(jsonGenerator, serviceProblem.getEndUserInformation());
        jsonGenerator.writeStringField("operatorReference", serviceProblem.operatorReference().asString());
        jsonGenerator.writeStringField("problem", serviceProblem.problem().description());
        jsonGenerator.writeStringField("assuranceViewUri", serviceProblem.assuranceViewUri().asString());
        writeResolution(jsonGenerator, serviceProblem.getResolution());

        jsonGenerator.writeBooleanField("hasActiveTroubleReport", serviceProblem.hasActiveTroubleReport());

        jsonGenerator.writeObjectField("openedDate", LocalDateTime.ofInstant(serviceProblem.openedDate().toInstant(), ZoneId.systemDefault()));
        jsonGenerator.writeObjectField("closedDate", serviceProblem.closedDate());

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
