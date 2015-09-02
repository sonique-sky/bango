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

        Long queueId = longValue(node, "queueId");
        long pullSla = longValue(node, "pullSla");
        String name = stringValue(node, "name");
        String domain = stringValue(node, "domain");
        boolean manualTransferAllowed = booleanValue(node, "manualTransferAllowed", false);
        boolean createServiceProblemAllowed = booleanValue(node, "createServiceProblemAllowed", false);
        boolean defaultWorkItemCreated = booleanValue(node, "defaultWorkItemCreated", false);

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

    private boolean booleanValue(JsonNode node, String propertyName, boolean defaultValue) {
        JsonNode propertyNode = node.get(propertyName);
        return propertyNode == null || propertyNode.isNull() ? defaultValue : propertyNode.asBoolean();
    }

    private Long longValue(JsonNode node, String propertyName) {
        JsonNode propertyNode = node.get(propertyName);
        return propertyNode == null || propertyNode.isNull() ? null : propertyNode.asLong();
    }

    private String stringValue(JsonNode node, String propertyName) {
        JsonNode propertyNode = node.get(propertyName);
        return propertyNode == null || propertyNode.isNull() ? null : propertyNode.asText();
    }

}