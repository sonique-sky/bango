package sonique.bango.json;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class LocalDateTimeSerializer extends JsonSerializer<LocalDateTime> {

    private static final DateTimeFormatter NICE_JSON_FORMAT = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm:ss");

    @Override
    public void serialize(LocalDateTime dateTime, JsonGenerator jsonGenerator, SerializerProvider serializerProvider) throws IOException {
        if (dateTime == null) {
            jsonGenerator.writeNull();
        } else {
            jsonGenerator.writeString(dateTime.format(NICE_JSON_FORMAT));
        }
    }

}
