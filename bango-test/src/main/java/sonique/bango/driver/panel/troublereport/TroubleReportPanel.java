package sonique.bango.driver.panel.troublereport;

import org.openqa.selenium.By;
import sky.sns.spm.domain.model.troublereport.TroubleReportStatus;
import sonique.bango.driver.component.HasTitle;
import sonique.bango.driver.component.SupermanElement;
import sonique.bango.driver.component.form.SupermanFormPanel;

public class TroubleReportPanel extends SupermanFormPanel implements HasTitle {
    protected TroubleReportPanel(SupermanElement element, By locator) {
        super(element, locator);
    }

    @Override
    public String title() {
        throw new UnsupportedOperationException("Method TroubleReportPanel title() not yet implemented");
    }

    public TroubleReportStatus status() {
        return TroubleReportStatus.New;
    }
}
