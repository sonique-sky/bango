package sonique.bango.json;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;
import sky.sns.spm.domain.model.refdata.PresentedServiceType;

import java.io.IOException;

public class PresentedServiceTypeSerializer extends JsonSerializer<PresentedServiceType> {

    @Override
    public void serialize(PresentedServiceType value, JsonGenerator gen, SerializerProvider serializers) throws IOException {
        gen.writeStartObject();
        gen.writeStringField("name", value.asString());
        gen.writeStringField("displayName", value.getDisplayName());
        gen.writeEndObject();
    }
}
