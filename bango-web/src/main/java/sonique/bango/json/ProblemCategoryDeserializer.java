package sonique.bango.json;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.fasterxml.jackson.databind.JsonNode;
import sky.sns.spm.domain.model.refdata.*;
import spm.domain.QueueId;
import spm.domain.QueueName;

import java.io.IOException;
import java.util.Map;

import static java.util.stream.Collectors.toMap;
import static java.util.stream.StreamSupport.stream;
import static sky.sns.spm.domain.model.refdata.QueueRoutingKey.routingKeyOf;

public class ProblemCategoryDeserializer extends JsonDeserializer<ProblemCategory> {

    @Override
    public ProblemCategory deserialize(JsonParser jsonParser, DeserializationContext deserializationContext) throws IOException {
        JsonNode node = jsonParser.getCodec().readTree(jsonParser);

        JsonNode problemIdNode = node.get("problemId");
        Long problemId = problemIdNode == null ? null : node.get("problemId").asLong();
        String problemCode = node.get("problemCode").asText();
        String description = node.get("description").asText();
        Boolean forceAutoTroubleReport = node.get("forceAutoTroubleReport").asBoolean();

        ProblemCategory problemCategory = problemId == null
                ? new ProblemCategory(problemCode, description, forceAutoTroubleReport)
                : new ProblemCategory(problemId, problemCode, description, forceAutoTroubleReport);

        Map<QueueRoutingKey, Queue> queueRouting = stream(node.get("queueRouting").spliterator(), false)
                .collect(toMap(
                        jsonNode -> routingKeyOf(new AssignmentCode(jsonNode.get("assignmentCode").asText()), PresentedServiceType.valueOf(jsonNode.get("serviceType").asText())),
                        jsonNode -> new Queue(new QueueId(jsonNode.get("queueId").asLong()), new QueueName(jsonNode.get("queueName").asText()))
                ));
        problemCategory.setQueueRouting(queueRouting);

        return problemCategory;
    }

}