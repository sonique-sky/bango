package sonique.bango.driver.panel.serviceproblem;

import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import sky.sns.spm.domain.model.refdata.ServiceTypeCode;
import sky.sns.spm.domain.model.serviceproblem.ServiceProblemStatus;
import sonique.bango.driver.component.HasTitle;
import sonique.bango.driver.component.form.SupermanFormPanel;
import spm.domain.DirectoryNumber;
import spm.domain.QueueName;
import spm.domain.ServiceProblemId;
import spm.domain.SnsServiceId;

import java.util.Date;

public class ServiceProblemPanel extends SupermanFormPanel implements HasTitle {
    public ServiceProblemPanel(ServiceProblemTabContent serviceProblemTabContent) {
        super(serviceProblemTabContent, By.cssSelector("[id^='serviceProblemPanel']"));
    }

    @Override
    public String title() {
        WebElement titleElement = element().findElement(By.cssSelector("span.x-header-text"));
        return titleElement.getText();
    }

    public ServiceProblemId serviceProblemId() {
        return new ServiceProblemId(textField("Service Problem Id").value());
    }

    public SnsServiceId serviceId() {
        return new SnsServiceId(textField("Service Id").value());
    }

    public ServiceProblemStatus status() {
        return ServiceProblemStatus.valueOf(textField("Status").value());
    }

    public DirectoryNumber directoryNumber() {
        return new DirectoryNumber(textField("Directory No").value());
    }

    public QueueName queue() {
        return new QueueName(textField("Queue").value());
    }

    public Date openedDate() {
        return dateField("Opened Date", "dd/MM/yyyy HH:mm").value();
    }

    public ServiceTypeCode serviceType() {
        return null;
    }
}
