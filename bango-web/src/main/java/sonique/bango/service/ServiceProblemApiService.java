package sonique.bango.service;

import sky.sns.spm.domain.model.EventHistoryItem;
import sky.sns.spm.domain.model.serviceproblem.DomainServiceProblem;
import spm.domain.ServiceProblemId;

import java.util.List;

public interface ServiceProblemApiService {
    DomainServiceProblem serviceProblemWithId(ServiceProblemId serviceProblemId);
    List<EventHistoryItem> addNote(ServiceProblemId serviceProblemId, String note);
    DomainServiceProblem pull(ServiceProblemId serviceProblemId);
    DomainServiceProblem hold(ServiceProblemId serviceProblemId);
    DomainServiceProblem release(ServiceProblemId serviceProblemId);
    List<EventHistoryItem> eventHistory(ServiceProblemId serviceProblemId);
}
