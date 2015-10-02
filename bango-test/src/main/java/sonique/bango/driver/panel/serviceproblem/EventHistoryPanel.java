package sonique.bango.driver.panel.serviceproblem;

import com.google.common.collect.Lists;
import org.apache.commons.lang3.StringUtils;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import sky.sns.spm.domain.model.EventHistoryItem;
import sky.sns.spm.domain.model.serviceproblem.EventDescription;
import sonique.bango.driver.HasDateFormatterSupport;
import sonique.bango.driver.component.HasTitle;
import sonique.bango.driver.component.form.SupermanPanel;

import java.time.ZoneId;
import java.util.Date;
import java.util.List;

public class EventHistoryPanel extends SupermanPanel implements HasTitle, HasDateFormatterSupport {
    public EventHistoryPanel(ServiceProblemTabContent serviceProblemTabContent) {
        super(serviceProblemTabContent, By.cssSelector("[id^='eventHistoryPanel']"));
    }

    @Override
    public String title() {
        WebElement titleElement = element().findElement(By.cssSelector("div.x-title-text"));
        return titleElement.getText();
    }

    public List<EventHistoryItem> historyItems() {
        WebElement gridView = element().findElement(By.cssSelector("div.x-grid-view"));
        List<WebElement> historyItems = gridView.findElements(By.cssSelector("table.x-grid-item"));

        return Lists.transform(historyItems, webElement -> {
            EventDescription eventDescription = EventDescription.fromDescription(webElement.findElement(By.cssSelector("td.event-type > div.x-grid-cell-inner")).getText());
            String createDateAsString = webElement.findElement(By.cssSelector("td.event-created-date > div.x-grid-cell-inner")).getText();
            String createdBy = webElement.findElement(By.cssSelector("td.event-created-by > div.x-grid-cell-inner")).getText();

            String note = webElement.findElement(By.cssSelector("div.event-note")).getText();
            return new EventHistoryItem(eventDescription, Date.from(format(createDateAsString, "dd/MM/yy HH:mm", "dd/MM/yyyy HH:mm").atZone(ZoneId.systemDefault()).toInstant()), createdBy, note) {
            };
        });
    }

    public EventHistoryToolbar eventHistoryToolbar() {
        return new EventHistoryToolbar(this);
    }
}
