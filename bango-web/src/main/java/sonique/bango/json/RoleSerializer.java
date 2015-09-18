package sonique.bango.json;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;
import sky.sns.spm.domain.model.refdata.Role;
import spm.agent.Privilege;

import java.io.IOException;

public class RoleSerializer extends JsonSerializer<Role> {
    @Override
    public void serialize(Role role, JsonGenerator jsonGenerator, SerializerProvider serializerProvider) throws IOException {
        jsonGenerator.writeStartObject();
        jsonGenerator.writeStringField("name", role.name());
        jsonGenerator.writeStringField("description", role.toString());
        jsonGenerator.writeBooleanField("mayBeTeamMember", role.mayBeTeamMember());

        jsonGenerator.writeArrayFieldStart("privileges");

        for (Privilege privilege : role.privileges()) {
            jsonGenerator.writeString(privilege.name());
        }

        jsonGenerator.writeEndArray();
        jsonGenerator.writeEndObject();
    }
}
