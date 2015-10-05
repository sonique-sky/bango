package sonique.bango.json;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.fasterxml.jackson.databind.JsonNode;
import sky.sns.spm.domain.model.majorserviceproblem.DomainMajorServiceProblem;
import spm.domain.OutageId;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;

import static com.google.common.collect.Sets.newHashSet;
import static org.apache.commons.lang3.StringUtils.isEmpty;

public class MajorServiceProblemDeserializer extends JsonDeserializer<DomainMajorServiceProblem> {

    @Override
    public DomainMajorServiceProblem deserialize(JsonParser jsonParser, DeserializationContext deserializationContext) throws IOException {
        JsonNode node = jsonParser.getCodec().readTree(jsonParser);

        String description = node.get("description").asText();
        Date startDate = parseDate(node.get("startDate").asText());
        Date expectedResolutionDate = parseDate(node.get("expectedResolutionDate").asText(null));
        String detailedNote = node.get("detailedNote").asText(null);

        return new DomainMajorServiceProblem(
                description,
                startDate,
                detailedNote,
                expectedResolutionDate,
                OutageId.nullOutageId(),
                newHashSet()
        );
    }

    private Date parseDate(String date) {
        return isEmpty(date) ? null : Date.from(LocalDateTime.parse(date).atZone(ZoneId.systemDefault()).toInstant());
    }

}