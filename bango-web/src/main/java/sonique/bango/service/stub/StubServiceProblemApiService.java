package sonique.bango.service.stub;

import sky.sns.spm.domain.model.DomainAgent;
import sky.sns.spm.domain.model.EventHistoryItem;
import sky.sns.spm.domain.model.refdata.Cause;
import sky.sns.spm.domain.model.refdata.Fault;
import sky.sns.spm.domain.model.refdata.Queue;
import sky.sns.spm.domain.model.refdata.ResolutionReason;
import sky.sns.spm.domain.model.serviceproblem.*;
import sky.sns.spm.infrastructure.repository.DomainServiceProblemRepository;
import sky.sns.spm.infrastructure.repository.QueueRepository;
import sky.sns.spm.infrastructure.security.SpringSecurityAuthorisedActorProvider;
import sonique.bango.service.ServiceProblemApiService;
import spm.domain.QueueId;
import spm.domain.ServiceProblemId;
import spm.domain.event.TransferHistoryEvent;
import spm.domain.event.UnassignHistoryEvent;

import java.util.Date;
import java.util.List;

import static sky.sns.spm.domain.model.serviceproblem.EventDescription.ServiceProblemTransferred;
import static sky.sns.spm.interfaces.shared.SystemActor.Spm;

public class StubServiceProblemApiService implements ServiceProblemApiService {
    private final DomainServiceProblemRepository serviceProblemRepository;
    private final SpringSecurityAuthorisedActorProvider authorisedActorProvider;
    private final QueueRepository queueRepository;

    public StubServiceProblemApiService(
            DomainServiceProblemRepository serviceProblemRepository,
            SpringSecurityAuthorisedActorProvider authorisedActorProvider,
            QueueRepository queueRepository) {
        this.serviceProblemRepository = serviceProblemRepository;
        this.authorisedActorProvider = authorisedActorProvider;
        this.queueRepository = queueRepository;
    }

    @Override
    public DomainServiceProblem serviceProblemWithId(ServiceProblemId serviceProblemId) {
        return serviceProblemRepository.findByServiceProblemId(serviceProblemId);
    }

    @Override
    public EventHistoryItem addNote(ServiceProblemId serviceProblemId, String note) {
        DomainServiceProblem serviceProblem = serviceProblemWithId(serviceProblemId);
        DomainAgent agent = authorisedActorProvider.getLoggedInAgent();
        serviceProblem.addNote(agent, note);
        return ServiceProblemEventHistoryItem.createEvent(EventDescription.Note, new Date(), agent.getAgentCode(), note, serviceProblem);
    }

    @Override
    public List<EventHistoryItem> eventHistory(ServiceProblemId serviceProblemId) {
        return serviceProblemWithId(serviceProblemId).historyItems();
    }

    @Override
    public DomainServiceProblem pull(ServiceProblemId serviceProblemId) {
        DomainServiceProblem serviceProblem = serviceProblemWithId(serviceProblemId);
        serviceProblem.tug(authorisedActorProvider.getLoggedInAgent());
        return serviceProblem;
    }

    @Override
    public DomainServiceProblem hold(ServiceProblemId serviceProblemId) {
        DomainServiceProblem serviceProblem = serviceProblemWithId(serviceProblemId);
        serviceProblem.holdWorkItem(authorisedActorProvider.getLoggedInAgent());

        return serviceProblem;
    }

    @Override
    public DomainServiceProblem release(ServiceProblemId serviceProblemId) {
        DomainServiceProblem serviceProblem = serviceProblemWithId(serviceProblemId);
        serviceProblem.unholdWorkItem(authorisedActorProvider.getLoggedInAgent());

        return serviceProblem;
    }

    @Override
    public DomainServiceProblem createWorkReminder(ServiceProblemId serviceProblemId, Date dateTime) {
        DomainServiceProblem serviceProblem = serviceProblemWithId(serviceProblemId);
        serviceProblem.createWorkReminder(
                authorisedActorProvider.getLoggedInAgent(),
                dateTime
        );

        return serviceProblem;
    }

    @Override
    public DomainServiceProblem transferToQueue(ServiceProblemId serviceProblemId, TransferType transferType, QueueId queueId) {
        Date date = new Date();
        DomainAgent loggedInAgent = authorisedActorProvider.getLoggedInAgent();
        DomainServiceProblem domainServiceProblem = serviceProblemWithId(serviceProblemId);
        Queue sourceQueue = domainServiceProblem.getQueue();
        Queue destinationQueue = queueRepository.getAllQueues().stream().filter(q -> q.id().equals(queueId)).findFirst().get();

        domainServiceProblem.transfer(destinationQueue);

        domainServiceProblem.writeHistoryFor(new TransferHistoryEvent(date, loggedInAgent, ServiceProblemTransferred, sourceQueue, destinationQueue));

        DomainWorkItem workItem = domainServiceProblem.workItem();
        workItem.setUnassigned();
        workItem.setAssignmentType(transferType.getAssignmentType());
        domainServiceProblem.writeHistoryFor(new UnassignHistoryEvent(date, Spm, loggedInAgent, ServiceProblemTransferred));
        return domainServiceProblem;
    }

    @Override
    public DomainServiceProblem clearServiceProblem(ServiceProblemId serviceProblemId, String fault, String cause, String resolution) {
        DomainServiceProblem serviceProblem = serviceProblemRepository.findByServiceProblemId(serviceProblemId);
        serviceProblem.clearByActor(
                new ServiceProblemResolution(new Fault(fault, fault), new Cause(cause, cause), new ResolutionReason(resolution, resolution)),
                authorisedActorProvider.getLoggedInAgent()
        );
        return serviceProblem;
    }
}
