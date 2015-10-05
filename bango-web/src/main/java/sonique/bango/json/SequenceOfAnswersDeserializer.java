package sonique.bango.json;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.fasterxml.jackson.databind.JsonNode;
import sky.sns.spm.domain.model.diagnostic.sqc.*;

import java.io.IOException;
import java.util.Iterator;

public class SequenceOfAnswersDeserializer extends JsonDeserializer<SequenceOfAnswers> {

    @Override
    public SequenceOfAnswers deserialize(JsonParser jsonParser, DeserializationContext deserializationContext) throws IOException {
        JsonNode questionsAndAnswers = jsonParser.getCodec().readTree(jsonParser);

        FaultCategory faultCategory = null;
        Frequency frequency = null;
        ModemPowerLight modemPowerLight = null;
        ModemSyncLight modemSyncLight = null;
        DamageType damageType = null;

        Iterator<JsonNode> elements = questionsAndAnswers.elements();
        while (elements.hasNext()) {
            JsonNode questionAndAnswer = elements.next();
            String reference = questionAndAnswer.asText("reference");
            String answer = questionAndAnswer.asText("answerCode");

            switch (reference) {
                case "rootQuestion":
                    faultCategory = FaultCategory.from(answer);
                    break;
                case "frequencyQuestion":
                    frequency = Frequency.from(answer);
                    break;
                case "modemPowerLightQuestion":
                    modemPowerLight = ModemPowerLight.from(answer);
                    break;
                case "modemSyncLightQuestion":
                    modemSyncLight = ModemSyncLight.from(answer);
                    break;
                case "damageTypeQuestion":
                    damageType = DamageType.from(answer);
                    break;
            }
        }

        return new SequenceOfAnswers(
                faultCategory,
                frequency,
                modemPowerLight,
                modemSyncLight,
                damageType
        );
    }

}