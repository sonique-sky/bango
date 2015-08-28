package sonique.bango.json;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;
import sonique.types.StringValue;

import java.io.IOException;

public class StringValueSerializer extends JsonSerializer<StringValue> {

    @Override
    public void serialize(StringValue stringValue, JsonGenerator jsonGenerator, SerializerProvider serializerProvider) throws IOException {
        if (stringValue == null || stringValue.isNull()) {
            jsonGenerator.writeNull();
        } else {
            jsonGenerator.writeString(stringValue.asString());
        }
    }

}
