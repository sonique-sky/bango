package sonique.bango.service.stub;

import com.google.common.collect.ImmutableList;
import sky.sns.spm.domain.model.EventHistoryItem;
import sky.sns.spm.domain.model.RepairType;
import sky.sns.spm.domain.model.refdata.ServiceType;
import sky.sns.spm.domain.model.troublereport.DomainTroubleReport;
import sky.sns.spm.domain.model.troublereport.DomainTroubleReportSymptom;
import sky.sns.spm.infrastructure.repository.DomainServiceProblemRepository;
import sky.sns.spm.infrastructure.repository.DomainTroubleReportRepository;
import sky.sns.spm.infrastructure.security.SpringSecurityAuthorisedActorProvider;
import sky.sns.spm.web.spmapp.shared.dto.AvailableAppointmentDTO;
import sky.sns.spm.web.spmapp.shared.dto.EventHistoryDto;
import sky.sns.spm.web.spmapp.shared.dto.TroubleReportDto;
import sonique.bango.domain.troublereport.TroubleReportTemplate;
import sonique.bango.domain.troublereport.TroubleReportTemplateFactory;
import sonique.bango.service.TroubleReportApiService;
import spm.domain.ServiceProblemId;
import spm.domain.TroubleReportId;
import spm.pacman.domain.AppointmentTimeslot;
import spm.troublereport.ManualTroubleReportRaiser;

import java.util.Collection;
import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.stream.IntStream;

import static java.util.stream.Collectors.toList;
import static sky.sns.commons.datetime.utils.DateUtils.someDateAfter;
import static sonique.datafixtures.PrimitiveDataFixtures.someBoolean;
import static sonique.datafixtures.PrimitiveDataFixtures.someString;

public class StubTroubleReportApiService implements TroubleReportApiService {

    private final DomainTroubleReportRepository troubleReportRepository;
    private final DomainServiceProblemRepository serviceProblemRepository;
    private final TroubleReportTemplateFactory troubleReportTemplateFactory;
    private final SpringSecurityAuthorisedActorProvider authorisedActorProvider;
    private final ManualTroubleReportRaiser troubleReportRaiser;

    public StubTroubleReportApiService(
            DomainTroubleReportRepository troubleReportRepository,
            DomainServiceProblemRepository serviceProblemRepository,
            TroubleReportTemplateFactory troubleReportTemplateFactory,
            SpringSecurityAuthorisedActorProvider authorisedActorProvider,
            ManualTroubleReportRaiser troubleReportRaiser) {
        this.troubleReportRepository = troubleReportRepository;
        this.serviceProblemRepository = serviceProblemRepository;
        this.troubleReportTemplateFactory = troubleReportTemplateFactory;
        this.authorisedActorProvider = authorisedActorProvider;
        this.troubleReportRaiser = troubleReportRaiser;
    }

    @Override
    public DomainTroubleReport troubleReportWithId(TroubleReportId troubleReportId) {
        return troubleReportRepository.findByTroubleReportId(troubleReportId);
    }

    @Override
    public Collection<DomainTroubleReport> troubleReportsFor(ServiceProblemId serviceProblemId) {
        return ImmutableList.copyOf(troubleReportRepository.findByServiceProblemId(serviceProblemId));
    }

    @Override
    public TroubleReportTemplate templateFor(ServiceProblemId serviceProblemId) {
        return troubleReportTemplateFactory.createFrom(serviceProblemRepository.findByServiceProblemId(serviceProblemId));
    }

    @Override
    public List<DomainTroubleReportSymptom> symptomsFor(ServiceType serviceType) {
        return troubleReportRepository.getTroubleReportSymptomsFor(serviceType);
    }

    @Override
    public Collection<AvailableAppointmentDTO> availableAppointmentsFor(
            ServiceProblemId serviceProblemId,
            RepairType repairType,
            Date appointmentStartDate) {

        return IntStream.range(0, 5).mapToObj(i ->
                new AvailableAppointmentDTO(someDateAfter(appointmentStartDate), someBoolean(), someBoolean())).collect(toList());
    }

    @Override
    public String reserveAppointmentFor(ServiceProblemId serviceProblemId, RepairType repairType, Date date, AppointmentTimeslot appointmentTimeslot) {
        return someString();
    }

    @Override
    public List<EventHistoryItem> eventHistory(TroubleReportId troubleReportId) {
        return troubleReportRepository.findByTroubleReportId(troubleReportId).historyItems();
    }

    @Override
    public void raiseTroubleReport(TroubleReportTemplate troubleReportTemplate) {
        TroubleReportDto troubleReportDto = new TroubleReportDto(
                troubleReportTemplate.serviceProblemId(),
                troubleReportTemplate.accessHazards(),
                troubleReportTemplate.accessNotes(),
                troubleReportTemplate.amendRequested(),
                troubleReportTemplate.appointmentReference(),
                troubleReportTemplate.btReference(),
                troubleReportTemplate.cancelRequested(),
                troubleReportTemplate.confirmEquipmentDisconnectedRequested(),
                troubleReportTemplate.contactName(),
                troubleReportTemplate.contactNumber(),
                troubleReportTemplate.description(),
                troubleReportTemplate.lineTestSummary(),
                troubleReportTemplate.providerReference(),
                troubleReportTemplate.notes(),
                troubleReportTemplate.secondaryContactName(),
                troubleReportTemplate.secondaryContactNumber(),
                troubleReportTemplate.serviceId().asLong(),
                troubleReportTemplate.status(),
                troubleReportTemplate.testProduct(),
                troubleReportTemplate.troubleReportId(),
                troubleReportTemplate.twentyFourHourAccess(),
                troubleReportTemplate.upperTrcBand(),
                troubleReportTemplate.temporaryCallDiversionNumber(),
                troubleReportTemplate.isResponseRequired(),
                troubleReportTemplate.coopCallRequested(),
                troubleReportTemplate.symptom(),
                troubleReportTemplate.intermittentProblem(),
                troubleReportTemplate.earliestAccessDate(),
                troubleReportTemplate.latestAccessDate(),
                Collections.<EventHistoryDto>emptyList(),
                troubleReportTemplate.structuredQuestionCode(),
                troubleReportTemplate.disRequested(),
                troubleReportTemplate.broadbandFault()
        );
        troubleReportRaiser.raiseFor(troubleReportDto, authorisedActorProvider.getLoggedInAgent());
    }
}
