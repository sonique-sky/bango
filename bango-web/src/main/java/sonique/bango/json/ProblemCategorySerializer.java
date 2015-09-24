package sonique.bango.json;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;
import sky.sns.spm.domain.model.refdata.*;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import static java.util.stream.Collectors.toList;

public class ProblemCategorySerializer extends JsonSerializer<ProblemCategory> {

    @Override
    public void serialize(ProblemCategory value, JsonGenerator gen, SerializerProvider serializers) throws IOException {
        gen.writeStartObject();

        gen.writeNumberField("problemId", value.problemId());
        gen.writeStringField("problemCode", value.problemCode());
        gen.writeStringField("description", value.description());
        gen.writeBooleanField("forceAutoTroubleReport", value.forceAutoTroubleReport());

        Map<QueueRoutingKey, Queue> queueRouting = value.getQueueRouting();

        List<JsonFriendlyEntry> collect = queueRouting.entrySet().stream()
                .map(JsonFriendlyEntry::new)
                .collect(toList());

        gen.writeObjectField("queueRouting", collect);

        gen.writeEndObject();
    }

    private static class JsonFriendlyEntry {
        public final AssignmentCode assignmentCode;
        public final PresentedServiceType serviceType;
        public final Integer queueId;
        public final String queueName;

        public JsonFriendlyEntry(Map.Entry<QueueRoutingKey, Queue> entry) {
            this.assignmentCode = entry.getKey().assignmentCode();
            this.serviceType = entry.getKey().serviceType();
            this.queueId = entry.getValue().id().asInteger();
            this.queueName = entry.getValue().name().asString();
        }
    }

}
