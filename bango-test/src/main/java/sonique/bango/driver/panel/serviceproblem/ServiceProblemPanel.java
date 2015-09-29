package sonique.bango.driver.panel.serviceproblem;

import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import sky.sns.spm.domain.model.refdata.PresentedServiceType;
import sky.sns.spm.domain.model.refdata.ServiceType;
import sky.sns.spm.domain.model.serviceproblem.ServiceProblemStatus;
import sonique.bango.driver.component.HasTitle;
import sonique.bango.driver.component.form.SupermanPanel;
import spm.domain.OperatorReference;
import spm.domain.QueueName;
import spm.domain.ServiceProblemId;
import spm.domain.SnsServiceId;
import spm.messages.bt.types.DirectoryNumber;

import java.time.LocalDateTime;
import java.util.Date;

import static sonique.utils.StringUtils.unCamel;

public class ServiceProblemPanel extends SupermanPanel implements HasTitle {
    public ServiceProblemPanel(ServiceProblemTabContent serviceProblemTabContent) {
        super(serviceProblemTabContent, By.cssSelector("[id^='serviceProblemPanel']"));
    }

    @Override
    public String title() {
        WebElement titleElement = element().findElement(By.cssSelector("div.x-title-text"));
        return titleElement.getText();
    }

    public ServiceProblemId serviceProblemId() {
        return new ServiceProblemId(textFieldValue("Service Problem Id"));
    }

    public SnsServiceId serviceId() {
        return new SnsServiceId(textFieldValue("Service Id"));
    }

    public ServiceProblemStatus status() {
        return ServiceProblemStatus.valueOf(textFieldValue("Status"));
    }

    public DirectoryNumber directoryNumber() {
        return new DirectoryNumber(textFieldValue("Directory No"));
    }

    public QueueName queue() {
        return new QueueName(textFieldValue("Queue"));
    }

    public LocalDateTime openedDate() {
        return dateField("Opened Date", "dd/MM/yyyy HH:mm").value();
    }

    public LocalDateTime closedDate() {
        return dateField("Closed Date", "dd/MM/yyyy HH:mm").value();
    }

    public PresentedServiceType serviceType() {
        return fromDescription(textFieldValue("Service Type"));
    }

    public String customerName() {
        return textFieldValue("Customer Name");
    }

    public String contactNumber() {
        return textFieldValue("Contact No");
    }

    public String operatorAccountNumber() {
        return textFieldValue("Chordiant Acc No");
    }

    public String problem() {
        return textFieldValue("Problem");
    }

    public OperatorReference operatorReference() {
        return new OperatorReference(textFieldValue("Operator Ref"));
    }

    public String fault() {
        return textFieldValue("Fault");
    }

    public String cause() {
        return textFieldValue("Cause");
    }

    public String resolutionReason() {
        return textFieldValue("Resolution Reason");
    }

    private String textFieldValue(String label) {
        return textField(label).value();
    }

    private PresentedServiceType fromDescription(String description) {
        for (PresentedServiceType serviceTypeCode : PresentedServiceType.values()) {
            if (serviceTypeCode.getDisplayName().equals(description)){
                return serviceTypeCode;
            }
        }
        throw new IllegalArgumentException(String.format("No %s for [%s]", unCamel(ServiceType.class), description));
    }
}
