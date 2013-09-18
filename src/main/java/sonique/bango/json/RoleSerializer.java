package sonique.bango.json;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;
import sonique.bango.domain.Privilege;
import sonique.bango.domain.Role;

import java.io.IOException;

public class RoleSerializer extends JsonSerializer<Role> {
    @Override
    public void serialize(Role role, JsonGenerator jsonGenerator, SerializerProvider serializerProvider) throws IOException {
        jsonGenerator.writeStartObject();
        jsonGenerator.writeStringField("name", role.name());

        jsonGenerator.writeArrayFieldStart("privileges");

        for (Privilege privilege : role.privileges()) {
            jsonGenerator.writeString(privilege.name());
        }

        jsonGenerator.writeEndArray();
        jsonGenerator.writeEndObject();
    }
}
