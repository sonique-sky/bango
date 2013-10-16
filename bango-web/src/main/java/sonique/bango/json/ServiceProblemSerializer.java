package sonique.bango.json;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;
import org.joda.time.format.DateTimeFormat;
import org.joda.time.format.DateTimeFormatter;
import sky.sns.spm.domain.model.serviceproblem.DomainServiceProblem;
import sky.sns.spm.domain.model.serviceproblem.EndUserInformation;

import java.io.IOException;

public class ServiceProblemSerializer extends JsonSerializer<DomainServiceProblem> {

    private static final DateTimeFormatter JSON_DATE_FORMAT = DateTimeFormat.forPattern("dd/MM/yyyy HH:mm:ss");

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

        jsonGenerator.writeBooleanField("hasActiveTroubleReport", serviceProblem.hasActiveTroubleReport());

        jsonGenerator.writeStringField("openedDate", JSON_DATE_FORMAT.print(serviceProblem.openedDate().getTime()));

        if (serviceProblem.hasWorkItem()) {
            jsonGenerator.writeObjectField("workItem", serviceProblem.workItem());
        } else {
            jsonGenerator.writeObjectFieldStart("workItem");
            jsonGenerator.writeObjectFieldStart("agent");
            jsonGenerator.writeEndObject();
            jsonGenerator.writeEndObject();
        }

        jsonGenerator.writeObjectField("queue", serviceProblem.getQueue());

        jsonGenerator.writeEndObject();
    }

    private void writeEndUserInformation(JsonGenerator jsonGenerator, EndUserInformation endUserInformation) throws IOException {
        jsonGenerator.writeObjectFieldStart("endUserInformation");
        jsonGenerator.writeStringField("preferredContactNumber", endUserInformation.getPreferredContactNumber());
        jsonGenerator.writeStringField("name", endUserInformation.getName());
        jsonGenerator.writeStringField("operatorAccountNumber", endUserInformation.getOperatorAccountNumber());
        jsonGenerator.writeEndObject();
    }
}
