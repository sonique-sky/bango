package sonique.bango.driver.panel.serviceproblem;

import com.google.common.base.Function;
import com.google.common.collect.Lists;
import org.apache.commons.lang.StringUtils;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import sky.sns.spm.domain.model.EventHistoryItem;
import sky.sns.spm.domain.model.serviceproblem.EventDescription;
import sonique.bango.driver.component.HasTitle;
import sonique.bango.driver.component.form.SupermanFormPanel;
import sonique.types.date.format.LocalDateTimeFormatter;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.List;

public class EventHistoryPanel extends SupermanFormPanel implements HasTitle {
    public EventHistoryPanel(ServiceProblemTabContent serviceProblemTabContent) {
        super(serviceProblemTabContent, By.cssSelector("[id^='eventHistoryPanel']"));
    }

    @Override
    public String title() {
        WebElement titleElement = element().findElement(By.cssSelector("span.x-header-text"));
        return titleElement.getText();
    }

    public List<EventHistoryItem> historyItems() {
        WebElement gridView = element().findElement(By.cssSelector("div.x-grid-view"));
        List<WebElement> elements = gridView.findElements(By.cssSelector("td.x-grid-rowwrap"));

        return Lists.transform(elements, new Function<WebElement, EventHistoryItem>() {
            @Override
            public EventHistoryItem apply(WebElement webElement) {
                EventDescription eventDescription = EventDescription.fromDescription(webElement.findElement(By.cssSelector("td.event-type > div.x-grid-cell-inner")).getText());
                String createDateAsString = webElement.findElement(By.cssSelector("td.event-created-date > div.x-grid-cell-inner")).getText();
                String createdBy = webElement.findElement(By.cssSelector("td.event-created-by > div.x-grid-cell-inner")).getText();

                String note = webElement.findElement(By.cssSelector("div.event-note")).getText();
                return new EventHistoryItem(eventDescription, dateFor(createDateAsString), createdBy, note) {
                };
            }

            private Date dateFor(String value) {
                if (StringUtils.isEmpty(value)) {
                    return null;
                }
                try {
                    return new SimpleDateFormat("dd/MM/yyyy HH:mm").parse(value);
                } catch (ParseException e) {
                    e.printStackTrace();
                }
                return new Date();
            }
        });
    }

    public EventHistoryToolbar eventHistoryToolbar() {
        return new EventHistoryToolbar(this);
    }
}
