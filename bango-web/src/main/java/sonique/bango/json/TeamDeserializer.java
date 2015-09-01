package sonique.bango.json;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.fasterxml.jackson.databind.JsonNode;
import com.google.common.collect.Lists;
import sky.sns.spm.domain.model.DomainTeam;
import sky.sns.spm.domain.model.refdata.Queue;
import sky.sns.spm.domain.model.refdata.TeamBuilder;
import spm.domain.QueueId;
import spm.domain.QueueName;
import spm.domain.TeamId;
import spm.domain.TeamName;

import java.io.IOException;
import java.util.List;

public class TeamDeserializer extends JsonDeserializer<DomainTeam> {

    @Override
    public DomainTeam deserialize(JsonParser jsonParser, DeserializationContext deserializationContext) throws IOException {
        JsonNode node = jsonParser.getCodec().readTree(jsonParser);

        long id = node.get("id").asLong();
        String name = node.get("name").asText();
        List<Queue> assignedQueuesList = Lists.newArrayList();

        JsonNode assignedQueues = node.get("assignedQueues");
        if (assignedQueues != null) {
            assignedQueues.iterator().forEachRemaining(queue -> {
                assignedQueuesList.add(new Queue(new QueueId(queue.get("id").asLong()), new QueueName(queue.get("name").asText())));
            });
        }

        return new TeamBuilder()
                .with(new TeamId(id))
                .with(new TeamName(name))
                .withAssignedQueues(assignedQueuesList)
                .build();
    }
}