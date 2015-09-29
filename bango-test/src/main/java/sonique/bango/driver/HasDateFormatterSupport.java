package sonique.bango.driver;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.Date;

public interface HasDateFormatterSupport {
    default LocalDateTime format(String dateString, String originDateFormat, String targetDateFormat) {
        try {
            SimpleDateFormat dateFormatter = new SimpleDateFormat(originDateFormat);
            Date oldDate = dateFormatter.parse(dateString);
            dateFormatter.applyPattern(targetDateFormat);
            Instant newDateInstant = dateFormatter.parse(dateFormatter.format(oldDate)).toInstant();
            return LocalDateTime.ofInstant(newDateInstant, ZoneId.systemDefault());
        } catch (ParseException e) {
            throw new RuntimeException(e);
        }
    }
}
