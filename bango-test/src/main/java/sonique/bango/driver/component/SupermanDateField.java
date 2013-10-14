package sonique.bango.driver.component;

import org.apache.commons.lang3.StringUtils;
import org.joda.time.format.DateTimeFormat;
import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import sonique.bango.driver.panel.SupermanElement;

import java.util.Date;

public class SupermanDateField extends SupermanComponent implements SupermanField<Date> {

    private final String dateFormat;

    public SupermanDateField(SupermanElement element, String dateFormat, By by) {
        super(element, by);
        this.dateFormat = dateFormat;
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
        return DateTimeFormat.forPattern(dateFormat).parseDateTime(value).toDate();
    }

    @Override
    public void clear() {
        element().clear();
    }
}