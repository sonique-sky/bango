package sonique.bango.json;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;
import sky.sns.spm.domain.model.refdata.AssignmentCode;
import sky.sns.spm.domain.model.refdata.ProblemCategory;
import sky.sns.spm.domain.model.refdata.Queue;
import sky.sns.spm.domain.model.refdata.QueueRoutingKey;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import static java.util.stream.Collectors.toList;

public class ProblemCategorySerializer extends JsonSerializer<ProblemCategory> {

    @Override
    public void serialize(ProblemCategory problem, JsonGenerator gen, SerializerProvider serializers) throws IOException {
        if (problem == null) {
            gen.writeNull();
        } else {
            gen.writeStartObject();

            gen.writeNumberField("problemId", problem.problemId() == null ? 0 : problem.problemId());
            gen.writeStringField("problemCode", problem.problemCode());
            gen.writeStringField("description", problem.description());
            gen.writeBooleanField("forceAutoTroubleReport", problem.forceAutoTroubleReport());

            Map<QueueRoutingKey, Queue> queueRouting = problem.getQueueRouting();

            List<JsonFriendlyEntry> collect = queueRouting.entrySet().stream()
                    .map(JsonFriendlyEntry::new)
                    .collect(toList());

            gen.writeObjectField("queueRouting", collect);

            gen.writeEndObject();
        }
    }

    private static class JsonFriendlyEntry {
        public final AssignmentCode assignmentCode;
        public final String serviceType;
        public final String serviceTypeDisplayName;
        public final Integer queueId;
        public final String queueName;

        public JsonFriendlyEntry(Map.Entry<QueueRoutingKey, Queue> entry) {
            this.assignmentCode = entry.getKey().assignmentCode();
            this.serviceType = entry.getKey().serviceType().name();
            this.serviceTypeDisplayName = entry.getKey().serviceType().getDisplayName();
            this.queueId = entry.getValue().id().asInteger();
            this.queueName = entry.getValue().name().asString();
        }
    }
}
