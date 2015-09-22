package sonique.bango.json;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;
import sky.sns.spm.domain.model.refdata.PresentedServiceType;
import sky.sns.spm.domain.model.refdata.ProblemCategory;
import sky.sns.spm.domain.model.refdata.Queue;
import sky.sns.spm.domain.model.refdata.QueueRoutingKey;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.function.BiConsumer;

public class ProblemCategorySerializer extends JsonSerializer<ProblemCategory> {
    @Override
    public void serialize(ProblemCategory value, JsonGenerator gen, SerializerProvider serializers) throws IOException {
        gen.writeStartObject();

        gen.writeNumberField("problemId", value.problemId());
        gen.writeStringField("problemCode", value.problemCode());
        gen.writeStringField("description", value.description());
        gen.writeBooleanField("forceAutoTroubleReport", value.forceAutoTroubleReport());

        Map<QueueRoutingKey, Queue> queueRouting = value.getQueueRouting();

        Map<String, List<JsonFriendlyEntry>> collect = queueRouting.entrySet().stream()
                .collect(
                HashMap::new,
                new BiConsumer<Map<String, List<JsonFriendlyEntry>>, Map.Entry<QueueRoutingKey, Queue>>() {
                    @Override
                    public void accept(Map<String, List<JsonFriendlyEntry>> assignmentCodeMap, Map.Entry<QueueRoutingKey, Queue> queueRoutingKeyEntry) {
                        String assignmentCode = queueRoutingKeyEntry.getKey().assignmentCode().asString();
                        if (!assignmentCodeMap.containsKey(assignmentCode)) {
                            assignmentCodeMap.put(assignmentCode, new ArrayList<>());
                        }
                        assignmentCodeMap.get(assignmentCode).add(new JsonFriendlyEntry(queueRoutingKeyEntry));
                    }
                },
                Map::putAll
        );

        gen.writeObjectField("queueRouting", collect);

        gen.writeEndObject();
    }

    private static class JsonFriendlyEntry {
        public final PresentedServiceType serviceType;
        public final Queue queue;

        public JsonFriendlyEntry(Map.Entry<QueueRoutingKey, Queue> entry) {
            this.serviceType = entry.getKey().serviceType();
            this.queue = entry.getValue();
        }
    }
}
