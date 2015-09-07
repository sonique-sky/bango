package sonique.bango.json;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;
import sonique.bango.domain.troublereport.TroubleReportTemplate;
import sonique.types.date.format.LocalDateTimeFormatter;

import java.io.IOException;
import java.time.ZoneOffset;
import java.time.ZonedDateTime;

public class TroubleReportTemplateSerializer extends JsonSerializer<TroubleReportTemplate> {
    @Override
    public void serialize(TroubleReportTemplate troubleReportTemplate, JsonGenerator jsonGenerator, SerializerProvider serializerProvider) throws IOException {
        jsonGenerator.writeStartObject();

        jsonGenerator.writeObjectField("serviceProblemId", troubleReportTemplate.serviceProblemId());

        jsonGenerator.writeObjectField("troubleReportId", troubleReportTemplate.troubleReportId());
        jsonGenerator.writeObjectField("serviceType", troubleReportTemplate.serviceType());
        jsonGenerator.writeObjectField("serviceId", troubleReportTemplate.serviceId());
        jsonGenerator.writeStringField("providerReference", troubleReportTemplate.providerReference());
        jsonGenerator.writeStringField("btReference", troubleReportTemplate.btReference());
        jsonGenerator.writeStringField("description", troubleReportTemplate.description());
        jsonGenerator.writeStringField("appointmentReference", troubleReportTemplate.appointmentReference());
        jsonGenerator.writeStringField("accessHazards", troubleReportTemplate.accessHazards());
        jsonGenerator.writeStringField("accessNotes", troubleReportTemplate.accessNotes());
        jsonGenerator.writeStringField("contactName", troubleReportTemplate.contactName());
        jsonGenerator.writeStringField("contactNumber", troubleReportTemplate.contactNumber());
        jsonGenerator.writeStringField("secondaryContactName", troubleReportTemplate.secondaryContactName());
        jsonGenerator.writeStringField("secondaryContactNumber", troubleReportTemplate.secondaryContactNumber());
        jsonGenerator.writeStringField("notes", troubleReportTemplate.notes());
        jsonGenerator.writeStringField("temporaryCallDiversionNumber", troubleReportTemplate.temporaryCallDiversionNumber());
        jsonGenerator.writeBooleanField("cancelRequested", troubleReportTemplate.cancelRequested());
        jsonGenerator.writeBooleanField("amendRequested", troubleReportTemplate.amendRequested());
        jsonGenerator.writeBooleanField("confirmEquipmentDisconnectedRequested", troubleReportTemplate.confirmEquipmentDisconnectedRequested());
        jsonGenerator.writeBooleanField("broadbandFault", troubleReportTemplate.broadbandFault());
        jsonGenerator.writeObjectField("twentyFourHourAccess", troubleReportTemplate.twentyFourHourAccess());
        jsonGenerator.writeObjectField("coopCallRequested", troubleReportTemplate.coopCallRequested());
        jsonGenerator.writeObjectField("disRequested", troubleReportTemplate.disRequested());
        jsonGenerator.writeObjectField("isResponseRequired", troubleReportTemplate.isResponseRequired());
        jsonGenerator.writeObjectField("intermittentProblem", troubleReportTemplate.intermittentProblem());

        if (troubleReportTemplate.symptom() == null) {
            jsonGenerator.writeObjectFieldStart("symptom");
            jsonGenerator.writeEndObject();
        } else {
            jsonGenerator.writeObjectFieldStart("symptom");
            jsonGenerator.writeStringField("symptomCode", troubleReportTemplate.symptom().getSymptomCode());
            jsonGenerator.writeStringField("providerCode", troubleReportTemplate.symptom().getProviderCode());
            jsonGenerator.writeStringField("description", troubleReportTemplate.symptom().getDescription());
            jsonGenerator.writeBooleanField("mapsToNetworkFeature", troubleReportTemplate.symptom().mapsToNetworkFeature());
            jsonGenerator.writeStringField("mapToNetworkFeatureName", troubleReportTemplate.symptom().getMapToNetworkFeatureName());
            jsonGenerator.writeStringField("mapToNetworkFeaturePin", troubleReportTemplate.symptom().getMapToNetworkFeaturePin());
            jsonGenerator.writeEndObject();
        }

        if (troubleReportTemplate.lineTestSummary() == null) {
            jsonGenerator.writeObjectFieldStart("lineTestSummary");
            jsonGenerator.writeEndObject();
        } else {
            jsonGenerator.writeObjectFieldStart("lineTestSummary");
            jsonGenerator.writeStringField("lineTestReference", troubleReportTemplate.lineTestSummary().getLineTestReference());
            jsonGenerator.writeStringField("performerReference", troubleReportTemplate.lineTestSummary().getPerformerReference());
            jsonGenerator.writeStringField("mainFaultLocation", troubleReportTemplate.lineTestSummary().getMainFaultLocation());
            jsonGenerator.writeBooleanField("isCompleted", troubleReportTemplate.lineTestSummary().isCompleted());
            jsonGenerator.writeBooleanField("faultReportAdvised", troubleReportTemplate.lineTestSummary().isFaultReportAdvised());
            jsonGenerator.writeBooleanField("requiresAppointment", troubleReportTemplate.lineTestSummary().isRequiresAppointment());
            jsonGenerator.writeEndObject();
        }

        jsonGenerator.writeNumberField("upperTrcBand", troubleReportTemplate.upperTrcBand());
        jsonGenerator.writeObjectField("testProduct", troubleReportTemplate.testProduct());

        ZonedDateTime earliestDateTime = ZonedDateTime.ofInstant(troubleReportTemplate.earliestAccessDate().toInstant(), ZoneOffset.UTC);
        jsonGenerator.writeStringField("earliestAccessDate", LocalDateTimeFormatter.localDateTimeFormatter().print(earliestDateTime));
        ZonedDateTime latestDateTime = ZonedDateTime.ofInstant(troubleReportTemplate.latestAccessDate().toInstant(), ZoneOffset.UTC);
        jsonGenerator.writeStringField("latestAccessDate", LocalDateTimeFormatter.localDateTimeFormatter().print(latestDateTime));

        jsonGenerator.writeObjectField("structuredQuestionCode", troubleReportTemplate.structuredQuestionCode());
        jsonGenerator.writeObjectField("status", troubleReportTemplate.status());

        jsonGenerator.writeEndObject();
    }
}
