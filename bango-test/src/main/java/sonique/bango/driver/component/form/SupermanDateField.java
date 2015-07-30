package sonique.bango.driver.component.form;

import org.apache.commons.lang.StringUtils;
import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import sonique.bango.driver.component.SupermanComponent;
import sonique.bango.driver.component.SupermanElement;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.Instant;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.Date;

public class SupermanDateField extends SupermanComponent implements SupermanField<Date> {

    private static final String ORIGIN_DATE_FORMAT = "dd/MM/yy HH:mm";
    private final String targetDateFormat;

    public SupermanDateField(SupermanElement element, String targetDateFormat, By by) {
        super(element, by);
        this.targetDateFormat = targetDateFormat;
    }

    @Override
    public void enter(String enterValue) {
        element().sendKeys(enterValue);
        element().sendKeys(Keys.TAB);
    }

    @Override
    public Date value() {
        String value = element().getAttribute("value");

        if (StringUtils.isEmpty(value)) {
            return null;
        }

        try {
            SimpleDateFormat formatter = new SimpleDateFormat(ORIGIN_DATE_FORMAT);
            Date oldDate = formatter.parse(value);
            formatter.applyPattern(targetDateFormat);
            Instant newDateInstant = formatter.parse(formatter.format(oldDate)).toInstant();
            ZonedDateTime zonedDateTime = ZonedDateTime.ofInstant(newDateInstant, ZoneId.systemDefault());

            return Date.from(zonedDateTime.toInstant());
        } catch (ParseException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public void clear() {
        element().clear();
    }

    public static void main(String[] args) {

    }

}