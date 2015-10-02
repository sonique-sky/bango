package sonique.bango.json;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;
import sonique.types.Describable;

import java.io.IOException;

public class DescribableSerializer extends JsonSerializer<Describable> {
    @Override
    public void serialize(Describable describable, JsonGenerator jsonGenerator, SerializerProvider serializerProvider) throws IOException {
        if (describable == null) {
            jsonGenerator.writeNull();
        } else {
            jsonGenerator.writeString(describable.description());
        }
    }
}
