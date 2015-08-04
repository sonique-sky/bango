package sonique.bango.driver.panel.troublereport;

import org.openqa.selenium.By;
import sky.sns.spm.domain.model.troublereport.TestProduct;
import sky.sns.spm.domain.model.troublereport.TroubleReportStatus;
import sonique.bango.driver.component.form.SupermanPanel;
import sonique.bango.driver.panel.serviceproblem.ServiceProblemTabContent;
import spm.domain.SnsServiceId;

public class TroubleReportPanel extends SupermanPanel {
    public TroubleReportPanel(ServiceProblemTabContent serviceProblemTabContent) {
        super(serviceProblemTabContent, By.cssSelector(""));
    }

    public TroubleReportStatus status() {
        return TroubleReportStatus.New;
    }

    public TestProduct testProduct() {
        return TestProduct.valueOf(textField("Test Product").value());
    }

    public SnsServiceId serviceId() {
        return new SnsServiceId(textField("ServiceId").value());
    }
}
