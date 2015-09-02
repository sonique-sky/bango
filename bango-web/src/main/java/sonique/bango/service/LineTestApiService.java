package sonique.bango.service;

import sky.sns.spm.web.spmapp.shared.dto.LineTestSummaryDTO;
import spm.domain.SnsServiceId;

import java.util.List;

public interface LineTestApiService {

    List<LineTestSummaryDTO> lineTestsFor(SnsServiceId serviceId);

}
