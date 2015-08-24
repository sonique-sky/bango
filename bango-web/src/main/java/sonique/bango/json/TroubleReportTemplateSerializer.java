package sonique.bango.json;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;
import sonique.bango.domain.troublereport.TroubleReportTemplate;
import spm.domain.TroubleReportId;

import java.io.IOException;

public class TroubleReportTemplateSerializer extends JsonSerializer<TroubleReportTemplate> {
    @Override
    public void serialize(TroubleReportTemplate troubleReportTemplate, JsonGenerator jsonGenerator, SerializerProvider serializerProvider) throws IOException {
        jsonGenerator.writeStartObject();

        jsonGenerator.writeNumberField("serviceProblemId", troubleReportTemplate.serviceProblemId().asLong());

        TroubleReportId troubleReportId = troubleReportTemplate.troubleReportId();
        if (troubleReportId == null || troubleReportId.isNull()) {
            jsonGenerator.writeNullField("troubleReportId");
        } else {
            jsonGenerator.writeNumberField("troubleReportId", troubleReportId.asLong());
        }

        jsonGenerator.writeEndObject();
    }
}
