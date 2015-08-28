package sonique.bango.json;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;
import sky.sns.spm.web.spmapp.shared.dto.TroubleReportSymptomDTO;

import java.io.IOException;

public class TroubleReportSymptomDTOSerializer extends JsonSerializer<TroubleReportSymptomDTO> {
    @Override
    public void serialize(TroubleReportSymptomDTO troubleReportSymptomDTO, JsonGenerator jsonGenerator, SerializerProvider serializerProvider) throws IOException {
        jsonGenerator.writeStartObject();

        jsonGenerator.writeStringField("symptomCode", troubleReportSymptomDTO.getSymptomCode());
        jsonGenerator.writeStringField("providerCode", troubleReportSymptomDTO.getProviderCode());
        jsonGenerator.writeStringField("description", troubleReportSymptomDTO.getDescription());
        jsonGenerator.writeBooleanField("mapsToNetworkFeature", troubleReportSymptomDTO.mapsToNetworkFeature());
        jsonGenerator.writeStringField("mapToNetworkFeatureName", troubleReportSymptomDTO.getMapToNetworkFeatureName());
        jsonGenerator.writeStringField("mapToNetworkFeaturePin", troubleReportSymptomDTO.getMapToNetworkFeaturePin());

        jsonGenerator.writeEndObject();
    }
}
