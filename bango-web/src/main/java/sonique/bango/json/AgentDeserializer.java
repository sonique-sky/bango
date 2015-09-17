package sonique.bango.json;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.fasterxml.jackson.databind.JsonNode;
import com.google.common.base.Throwables;
import sky.sns.spm.domain.model.DomainAgent;
import sky.sns.spm.domain.model.DomainTeam;
import sky.sns.spm.domain.model.refdata.AgentDetails;
import sky.sns.spm.domain.model.refdata.Role;
import spm.domain.TeamId;
import spm.domain.TeamName;

import java.io.IOException;
import java.lang.reflect.Field;

public class AgentDeserializer extends JsonDeserializer<DomainAgent> {

    @Override
    public DomainAgent deserialize(JsonParser jsonParser, DeserializationContext deserializationContext) throws IOException {
        JsonNode node = jsonParser.getCodec().readTree(jsonParser);

        String agentCode = node.get("agentCode").asText();

        String firstName = node.get("details").get("firstName").asText();
        String lastName = node.get("details").get("lastName").asText();
        AgentDetails details = new AgentDetails(firstName, lastName);

        Role role = Role.valueOf(node.get("role").get("name").asText());

        JsonNode teamNode = node.get("team");
        DomainTeam team = null;
        if (teamNode.hasNonNull("id")) {
            team = new DomainTeam(new TeamName(teamNode.get("name").asText()));
            setField(team, "id", new TeamId(teamNode.get("id").asText()));
        }

        return new DomainAgent(agentCode, agentCode.toUpperCase(), details, role, team);
    }

    private static void setField(Object entry, String name, Object value) {
        try {
            Field field = entry.getClass().getDeclaredField(name);
            field.setAccessible(true);
            field.set(entry, value);
        } catch (NoSuchFieldException | IllegalAccessException e) {
            throw Throwables.propagate(e);
        }
    }
}
