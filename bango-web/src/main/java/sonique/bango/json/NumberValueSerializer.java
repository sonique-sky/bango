package sonique.bango.json;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;
import sonique.types.NumberValue;

import java.io.IOException;

public class NumberValueSerializer extends JsonSerializer<NumberValue> {

    @Override
    public void serialize(NumberValue numberValue, JsonGenerator jsonGenerator, SerializerProvider serializerProvider) throws IOException {
        if (numberValue == null || numberValue.isNull()) {
            jsonGenerator.writeNull();
        } else {
            jsonGenerator.writeNumber(numberValue.asLong());
        }
    }
}
