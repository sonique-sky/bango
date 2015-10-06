package sonique.bango.service;

import sky.sns.spm.domain.model.EventHistoryItem;
import sky.sns.spm.domain.model.majorserviceproblem.DomainMajorServiceProblem;
import sky.sns.spm.domain.model.majorserviceproblem.DomainMajorServiceProblemDashboardEntry;
import sky.sns.spm.interfaces.shared.PagedSearchResults;
import sky.sns.spm.web.spmapp.shared.dto.SearchParametersDTO;
import spm.domain.MajorServiceProblemId;

import java.util.List;

public interface MspApiService {
    PagedSearchResults<DomainMajorServiceProblemDashboardEntry> read(SearchParametersDTO searchParameters);
    List<EventHistoryItem> eventHistory(MajorServiceProblemId majorServiceProblemId);
    DomainMajorServiceProblem create(DomainMajorServiceProblem msp);
    DomainMajorServiceProblem close(MajorServiceProblemId majorServiceProblemId);
    EventHistoryItem addNote(MajorServiceProblemId majorServiceProblemId, String note);
}
