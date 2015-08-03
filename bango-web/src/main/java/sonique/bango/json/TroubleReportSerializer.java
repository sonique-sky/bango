package sonique.bango.json;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;
import sky.sns.spm.domain.model.troublereport.DomainTroubleReport;

import java.io.IOException;

public class TroubleReportSerializer extends JsonSerializer<DomainTroubleReport> {
    @Override
    public void serialize(DomainTroubleReport troubleReport, JsonGenerator jsonGenerator, SerializerProvider serializerProvider) throws IOException {
        jsonGenerator.writeStartObject();
        jsonGenerator.writeNumberField("troubleReportId", troubleReport.getTroubleReportId().asInteger());
        jsonGenerator.writeNumberField("serviceId", troubleReport.getServiceId().asLong());
        jsonGenerator.writeStringField("status", troubleReport.getStatus().name());
        jsonGenerator.writeStringField("shortDescription", troubleReport.getShortDescription().asString());
        jsonGenerator.writeStringField("appointmentReference", troubleReport.getAppointmentReference());
        jsonGenerator.writeStringField("testProduct", troubleReport.getTestProduct().asString());

//        if (troubleReport.getSymptom() != null) {
//            jsonGenerator.writeObjectField("symptom", troubleReport.getSymptom());
//        }

    }
}
