package sonique.bango.service.stub;

import com.google.common.collect.Sets;
import sky.sns.spm.domain.model.refdata.Queue;
import sky.sns.spm.domain.model.refdata.ServiceType;
import sky.sns.spm.domain.model.serviceproblem.DomainServiceProblem;
import sky.sns.spm.domain.model.serviceproblem.TransferType;
import sky.sns.spm.domain.model.serviceproblem.WorkItemAction;
import sky.sns.spm.domain.model.troublereport.*;
import sky.sns.spm.infrastructure.repository.DomainTroubleReportRepository;
import sky.sns.spm.infrastructure.repository.QueueRepository;
import sky.sns.spm.interfaces.shared.Actor;
import sky.sns.spm.interfaces.shared.SystemActor;
import sonique.id.IdGenerator;
import sonique.utils.MultiKeyMap;
import spm.domain.ProviderReference;
import spm.domain.SpmErrorReporter;
import spm.domain.event.TroubleReportRequestedHistoryEvent;
import spm.troublereport.TroubleReportRaiser;

import java.util.Date;
import java.util.Map;
import java.util.UUID;

import static com.google.common.collect.Sets.newHashSet;
import static sky.sns.spm.domain.model.refdata.ServiceType.*;

public class StubTroubleReportRaiser implements TroubleReportRaiser {

    private final Map<ServiceType, TroubleReportFactory> troubleReportFactories;
    private final IdGenerator<ProviderReference> idGenerator = () -> new ProviderReference(UUID.randomUUID().toString());
    private final QueueRepository queueRepository;


    public StubTroubleReportRaiser(QueueRepository queueRepository, DomainTroubleReportRepository troubleReportRepository) {
        this.queueRepository = queueRepository;
        troubleReportFactories = new MultiKeyMap<ServiceType, TroubleReportFactory>() {{
            put(newHashSet(NvnData, NvnVoice, OnnetBroadband), new DefaultTroubleReportFactory(troubleReportRepository, idGenerator, Sets::newHashSet));
            put(FTTC, new FttcTroubleReportFactory(troubleReportRepository, idGenerator));
            put(WLR3, new Wlr3TroubleReportFactory(troubleReportRepository, idGenerator));
            put(newHashSet(RoiOffnetVoice, RoiRuralOffnetBroadband, RoiUrbanOffnetBroadband, RoiFttc), new RoiTroubleReportFactory(troubleReportRepository, idGenerator));
        }};
    }

    @Override
    public void raiseFor(DomainServiceProblem serviceProblem, TroubleReportDetail troubleReportDetail, Actor actor, SpmErrorReporter spmErrorReporter) {
        DomainTroubleReport troubleReport = troubleReportFactories.get(serviceProblem.getServiceType()).createTroubleReportFrom(serviceProblem, troubleReportDetail, actor);

        Queue openreachQueue = queueRepository.findOpenreachQueueForServiceType(serviceProblem.getPresentedServiceType());

        serviceProblem.addTroubleReport(troubleReport);
        serviceProblem.writeHistoryFor(new TroubleReportRequestedHistoryEvent(actor, new Date()));
        serviceProblem.transferToQueue(TransferType.Hot, openreachQueue, SystemActor.Spm, WorkItemAction.InvestigateOpenreachTroubleReportProgress);
    }

}
