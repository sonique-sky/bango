package sonique.bango.json;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.fasterxml.jackson.databind.JsonNode;
import sky.sns.spm.domain.model.DomainTeam;
import spm.domain.TeamName;

import java.io.IOException;

public class TeamDeserializer extends JsonDeserializer<DomainTeam> {
    @Override
    public DomainTeam deserialize(JsonParser jsonParser, DeserializationContext deserializationContext) throws IOException {
        JsonNode node = jsonParser.getCodec().readTree(jsonParser);

        String name = node.get("name").asText();

        return new DomainTeam(new TeamName(name));
    }
}
