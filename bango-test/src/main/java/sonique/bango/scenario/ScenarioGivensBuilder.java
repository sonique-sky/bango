package sonique.bango.scenario;

import com.googlecode.yatspec.state.givenwhenthen.GivensBuilder;
import com.googlecode.yatspec.state.givenwhenthen.InterestingGivens;
import sonique.bango.SupermanScenario;

public class ScenarioGivensBuilder implements GivensBuilder {

    private final SupermanScenario supermanScenario;

    public ScenarioGivensBuilder(SupermanScenario supermanScenario) {
        this.supermanScenario = supermanScenario;
    }

    @Override
    public InterestingGivens build(InterestingGivens givens) throws Exception {
        supermanScenario.bindScenario();

//            supermanScenario.record(givens);

        return givens;
    }
}
