package sonique.bango.action;

import com.googlecode.yatspec.state.givenwhenthen.ActionUnderTest;
import com.googlecode.yatspec.state.givenwhenthen.CapturedInputAndOutputs;
import com.googlecode.yatspec.state.givenwhenthen.InterestingGivens;

public class BangoActionUnderTest implements ActionUnderTest {
    private final BangoAction action;

    public BangoActionUnderTest(BangoAction action) {
        this.action = action;
    }

    @Override
    public CapturedInputAndOutputs execute(InterestingGivens interestingGivens, CapturedInputAndOutputs capturedInputAndOutputs) throws Exception {
        action.goBoom();
        return capturedInputAndOutputs;
    }
}
