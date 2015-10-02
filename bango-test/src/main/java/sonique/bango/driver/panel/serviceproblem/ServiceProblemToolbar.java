package sonique.bango.driver.panel.serviceproblem;

import sonique.bango.driver.component.form.SupermanButton;

public class ServiceProblemToolbar extends SupermanToolbar {
    public ServiceProblemToolbar(ServiceProblemTabContent serviceProblemTabContent) {
        super(serviceProblemTabContent);
    }

    public SupermanButton pullButton() {
        return toolbarButton("Pull this item");
    }
}
