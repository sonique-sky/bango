package sonique.bango.service;

import sky.sns.spm.domain.model.EventHistoryItem;
import sky.sns.spm.domain.model.serviceproblem.DomainServiceProblem;
import sky.sns.spm.domain.model.serviceproblem.TransferType;
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
}
