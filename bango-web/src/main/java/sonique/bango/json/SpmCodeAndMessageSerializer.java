package sonique.bango.json;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;
import sky.sns.spm.validation.SpmCodeAndMessage;

import java.io.IOException;

public class SpmCodeAndMessageSerializer extends JsonSerializer<SpmCodeAndMessage> {
    @Override
    public void serialize(SpmCodeAndMessage value, JsonGenerator jgen, SerializerProvider provider) throws IOException {
        jgen.writeStartObject();
        jgen.writeStringField("code", value.getCode());
        jgen.writeStringField("message", value.getMessage());
        jgen.writeEndObject();
    }
}
