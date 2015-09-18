package sonique.bango.service;

import sky.sns.spm.domain.model.EventHistoryItem;
import sky.sns.spm.domain.model.serviceproblem.DomainServiceProblem;
import sky.sns.spm.domain.model.serviceproblem.TransferType;
import sky.sns.spm.interfaces.shared.PagedSearchResults;
import sonique.bango.domain.RequestParameters;
import spm.domain.QueueId;
import spm.domain.ServiceProblemId;

import java.util.Date;
import java.util.List;

public interface ServiceProblemApiService {
    DomainServiceProblem serviceProblemWithId(ServiceProblemId serviceProblemId);
    EventHistoryItem addNote(ServiceProblemId serviceProblemId, String note);
    DomainServiceProblem pull(ServiceProblemId serviceProblemId);
    DomainServiceProblem hold(ServiceProblemId serviceProblemId);
    DomainServiceProblem release(ServiceProblemId serviceProblemId);
    List<EventHistoryItem> eventHistory(ServiceProblemId serviceProblemId);
    DomainServiceProblem createWorkReminder(ServiceProblemId serviceProblemId, Date dateTime);
    DomainServiceProblem transferToQueue(ServiceProblemId serviceProblemId, TransferType transferType, QueueId queueId);
    DomainServiceProblem clearServiceProblem(ServiceProblemId serviceProblemId, String fault, String cause, String resolution);
    DomainServiceProblem selectNextWorkItem(ServiceProblemId serviceProblemId, String nextWorkItem);
    DomainServiceProblem reassignToAgent(ServiceProblemId serviceProblemId, String agentCode);

    PagedSearchResults<DomainServiceProblem> serviceProblems(RequestParameters requestParameters);
}
