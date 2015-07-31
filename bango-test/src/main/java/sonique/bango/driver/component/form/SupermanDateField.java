package sonique.bango.driver.component.form;

import org.apache.commons.lang.StringUtils;
import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import sonique.bango.driver.HasDateFormatterSupport;
import sonique.bango.driver.component.SupermanComponent;
import sonique.bango.driver.component.SupermanElement;

import java.util.Date;

public class SupermanDateField extends SupermanComponent implements SupermanField<Date>, HasDateFormatterSupport {

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

        return format(value, "dd/MM/yy HH:mm", targetDateFormat);
    }

    @Override
    public void clear() {
        element().clear();
    }
}