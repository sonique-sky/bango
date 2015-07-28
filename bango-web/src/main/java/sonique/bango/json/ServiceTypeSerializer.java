package sonique.bango.json;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;
import sky.sns.spm.domain.model.refdata.ServiceType;

import java.io.IOException;

public class ServiceTypeSerializer extends JsonSerializer<ServiceType> {
    @Override
    public void serialize(ServiceType serviceTypeCode, JsonGenerator jsonGenerator, SerializerProvider serializerProvider) throws IOException, JsonProcessingException {
        jsonGenerator.writeStartObject();
        jsonGenerator.writeStringField("code", serviceTypeCode.name());
        jsonGenerator.writeStringField("description", serviceTypeCode.getDisplayName());
        jsonGenerator.writeEndObject();
    }
}
