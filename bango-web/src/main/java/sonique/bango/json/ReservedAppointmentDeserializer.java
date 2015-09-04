package sonique.bango.json;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.fasterxml.jackson.databind.JsonNode;
import sonique.bango.domain.troublereport.ReserveAppointment;
import spm.domain.ServiceProblemId;

import java.io.IOException;

public class ReservedAppointmentDeserializer extends JsonDeserializer<ReserveAppointment> {
    @Override
    public ReserveAppointment deserialize(JsonParser jsonParser, DeserializationContext deserializationContext) throws IOException {
        JsonNode jsonNode = jsonParser.getCodec().readTree(jsonParser);

        ServiceProblemId serviceProblemId = new ServiceProblemId(jsonNode.get("serviceProblemId").longValue());
        String repairType = jsonNode.get("repairType").asText();
        long date = jsonNode.get("date").asLong();
        String timeSlot = jsonNode.get("timeSlot").asText().toUpperCase();

        return new ReserveAppointment(serviceProblemId, repairType, date, timeSlot);
    }
}
