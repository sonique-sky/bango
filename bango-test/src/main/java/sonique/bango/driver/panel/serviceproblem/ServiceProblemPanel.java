package sonique.bango.driver.panel.serviceproblem;

import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import sky.sns.spm.domain.model.refdata.ServiceTypeCode;
import sky.sns.spm.domain.model.serviceproblem.ServiceProblemStatus;
import sonique.bango.driver.component.HasTitle;
import sonique.bango.driver.component.form.SupermanFormPanel;
import spm.domain.*;

import java.util.Date;

import static sonique.utils.StringUtils.unCamel;

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
        return fromDescription(textField("Service Type").value());
    }

    public String customerName() {
        return textField("Customer Name").value();
    }

    public String contactNumber() {
        return textField("Contact No").value();
    }

    public String operatorAccountNumber() {
        return textField("Chordiant Acc No").value();
    }

    public String problem() {
        return textField("Problem").value();
    }

    public OperatorReference operatorReference() {
        return new OperatorReference(textField("Operator Ref").value());
    }

    public String fault() {
        return textField("Fault").value();
    }

    public String cause() {
        return textField("Cause").value();
    }

    public String resolutionReason() {
        return textField("Resolution Reason").value();
    }

    private ServiceTypeCode fromDescription(String description) {
        for (ServiceTypeCode serviceTypeCode : ServiceTypeCode.values()) {
            if (serviceTypeCode.getDisplayName().equals(description)){
                return serviceTypeCode;
            }
        }
        throw new IllegalArgumentException(String.format("No %s for [%s]", unCamel(ServiceTypeCode.class), description));
    }
}
