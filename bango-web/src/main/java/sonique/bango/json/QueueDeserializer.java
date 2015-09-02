package sonique.bango.json;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.fasterxml.jackson.databind.JsonNode;
import sky.sns.spm.domain.model.refdata.Queue;
import sky.sns.spm.domain.model.refdata.QueueDomain;
import spm.domain.QueueName;
import spm.domain.model.refdata.QueueBuilder;

import java.io.IOException;
import java.time.Duration;

public class QueueDeserializer extends JsonDeserializer<Queue> {

    @Override
    public Queue deserialize(JsonParser jsonParser, DeserializationContext deserializationContext) throws IOException {
        JsonNode node = jsonParser.getCodec().readTree(jsonParser);

        long queueId = node.get("queueId").asLong();
        String name = node.get("name").asText();
        long pullSla = node.get("pullSla").asLong();
        boolean manualTransferAllowed = node.get("manualTransferAllowed").asBoolean();
        boolean createServiceProblemAllowed = node.get("createServiceProblemAllowed").asBoolean();
        boolean defaultWorkItemCreated = node.get("defaultWorkItemCreated").asBoolean();
        String domain = node.get("domain").asText();

        return new QueueBuilder()
                .withId(queueId)
                .with(new QueueName(name))
                .withSlaDuration(Duration.ofHours(pullSla))
                .withAllowsManualTransfers(manualTransferAllowed)
                .withAllowCreateServiceProblem(createServiceProblemAllowed)
                .withCreateDefaultWorkItem(defaultWorkItemCreated)
                .with(QueueDomain.valueOf(domain))
                .build();
    }
}