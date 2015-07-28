package sonique.bango.driver.component.form;

import org.apache.commons.lang.StringUtils;
import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import sonique.bango.driver.component.SupermanComponent;
import sonique.bango.driver.component.SupermanElement;
import sonique.types.date.format.LocalDateTimeFormatter;

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
        return Date.from(LocalDateTimeFormatter.localDateTimeFormatter().parse(value).toInstant());
    }

    @Override
    public void clear() {
        element().clear();
    }
}