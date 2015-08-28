package sonique.bango.json;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;
import sky.sns.spm.web.spmapp.shared.dto.LineTestSummaryDTO;

import java.io.IOException;

public class LineTestSummaryDTOSerializer extends JsonSerializer<LineTestSummaryDTO> {
    @Override
    public void serialize(LineTestSummaryDTO lineTestSummaryDTO, JsonGenerator jsonGenerator, SerializerProvider serializerProvider) throws IOException {
        jsonGenerator.writeStartObject();
        jsonGenerator.writeStringField("lineTestReference", lineTestSummaryDTO.getLineTestReference());
        jsonGenerator.writeStringField("performerReference", lineTestSummaryDTO.getPerformerReference());
        jsonGenerator.writeStringField("mainFaultLocation", lineTestSummaryDTO.getMainFaultLocation());
        jsonGenerator.writeBooleanField("isCompleted", lineTestSummaryDTO.isCompleted());
        jsonGenerator.writeBooleanField("faultReportAdvised", lineTestSummaryDTO.isFaultReportAdvised());
        jsonGenerator.writeBooleanField("requiresAppointment", lineTestSummaryDTO.isRequiresAppointment());
        jsonGenerator.writeEndObject();
    }
}
