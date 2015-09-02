package sonique.bango.service.stub;

import sky.sns.spm.web.spmapp.shared.dto.LineTestSummaryDTO;
import sonique.bango.service.LineTestApiService;
import spm.domain.SnsServiceId;

import java.util.List;

import static java.util.Arrays.asList;
import static sonique.datafixtures.PrimitiveDataFixtures.someString;

public class StubLineTestApiService implements LineTestApiService {

    @Override
    public List<LineTestSummaryDTO> lineTestsFor(SnsServiceId serviceId) {
        return asList(
                new LineTestSummaryDTO(someString() + serviceId.asString(), serviceId.asString() + someString()),
                new LineTestSummaryDTO(someString() + serviceId.asString(), serviceId.asString() + someString())
        );
    }

}
