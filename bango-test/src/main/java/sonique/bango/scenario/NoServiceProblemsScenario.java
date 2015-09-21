package sonique.bango.scenario;

import com.google.common.collect.Lists;
import sky.sns.spm.domain.model.DomainAgent;
import sky.sns.spm.domain.model.serviceproblem.DomainServiceProblem;
import sky.sns.spm.interfaces.shared.PagedSearchResults;
import sonique.bango.app.ScenarioDriver;

public class NoServiceProblemsScenario extends SupermanScenario {

    public NoServiceProblemsScenario(ScenarioDriver scenarioDriver, DomainAgent agent) {
        super(scenarioDriver.servicesFor(agent));
    }

    @Override
    public void bindScenario() {
        PagedSearchResults<DomainServiceProblem> emptyList = new PagedSearchResults<DomainServiceProblem>(Lists.<DomainServiceProblem>newArrayList(), 0L);

    }
}