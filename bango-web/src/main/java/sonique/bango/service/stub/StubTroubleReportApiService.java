package sonique.bango.service.stub;

import com.google.common.collect.ImmutableList;
import sky.sns.spm.domain.model.EventHistoryItem;
import sky.sns.spm.domain.model.RepairType;
import sky.sns.spm.domain.model.refdata.ServiceType;
import sky.sns.spm.domain.model.serviceproblem.DomainServiceProblem;
import sky.sns.spm.domain.model.serviceproblem.EventDescription;
import sky.sns.spm.domain.model.troublereport.DomainTroubleReport;
import sky.sns.spm.domain.model.troublereport.DomainTroubleReportSymptom;
import sky.sns.spm.domain.model.troublereport.TroubleReportStatus;
import sky.sns.spm.infrastructure.repository.DomainServiceProblemRepository;
import sky.sns.spm.infrastructure.repository.DomainTroubleReportRepository;
import sky.sns.spm.infrastructure.security.SpringSecurityAuthorisedActorProvider;
import sky.sns.spm.interfaces.shared.SystemActor;
import sky.sns.spm.web.spmapp.client.dto.TroubleReportAmendmentDTOBuilder;
import sky.sns.spm.web.spmapp.shared.dto.AvailableAppointmentDTO;
import sky.sns.spm.web.spmapp.shared.dto.EventHistoryDto;
import sky.sns.spm.web.spmapp.shared.dto.TroubleReportAmendmentDTO;
import sky.sns.spm.web.spmapp.shared.dto.TroubleReportDto;
import sonique.bango.domain.troublereport.TroubleReportTemplate;
import sonique.bango.domain.troublereport.TroubleReportTemplateFactory;
import sonique.bango.service.TroubleReportApiService;
import spm.domain.AmendmentNoteBuilder;
import spm.domain.Note;
import spm.domain.ServiceProblemId;
import spm.domain.TroubleReportId;
import spm.pacman.domain.AppointmentTimeslot;
import spm.troublereport.ManualTroubleReportRaiser;
import spm.util.NoteBuilder;

import java.util.Collection;
import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.stream.IntStream;

import static java.util.stream.Collectors.toList;
import static sky.sns.commons.datetime.utils.DateUtils.someDateAfter;
import static sky.sns.spm.domain.model.serviceproblem.EventDescription.*;
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

    @Override
    public void amendTroubleReport(TroubleReportTemplate troubleReportTemplate) {
        AmendmentNoteBuilder amendmentNoteBuilder = new AmendmentNoteBuilder();
        DomainTroubleReport troubleReport = troubleReportRepository.findByTroubleReportId(troubleReportTemplate.troubleReportId());

        TroubleReportAmendmentDTO amendmentDto = new TroubleReportAmendmentDTOBuilder()
                .withAccessHazards(troubleReportTemplate.accessHazards())
                .withAccessNotes(troubleReportTemplate.accessNotes())
                .withAppointmentReference(troubleReportTemplate.appointmentReference())
                .withContactName(troubleReportTemplate.contactName())
                .withContactNumber(troubleReportTemplate.contactNumber())
                .withSecondaryContactName(troubleReportTemplate.secondaryContactName())
                .withSecondaryContactNumber(troubleReportTemplate.secondaryContactNumber())
                .withTemporaryCallDiversionNumber(troubleReportTemplate.temporaryCallDiversionNumber())
                .withTroubleReportId(troubleReportTemplate.troubleReportId())
                .withUpperTrcBand(troubleReportTemplate.upperTrcBand())
                .withNotes(troubleReportTemplate.notes())
                .build();

        troubleReport.writeHistoryItem(TroubleReportAmendRequested, authorisedActorProvider.authorisedActor(), new Date(), amendmentNoteBuilder.buildNoteFrom(troubleReport, amendmentDto));
        troubleReport.applyAmendment(amendmentDto);

        troubleReport.getServiceProblem().writeHistoryItem(TroubleReportAmendRequested, authorisedActorProvider.authorisedActor(), new Date());

        troubleReport.writeHistoryItem(EventDescription.TroubleReportAmendPending, SystemActor.Openreach, new Date());
        troubleReport.writeHistoryItem(EventDescription.TroubleReportAmendAccepted, SystemActor.Openreach, new Date());
        troubleReport.writeHistoryItem(EventDescription.TroubleReportAmendCompleted, SystemActor.Openreach, new Date());
        troubleReport.clearAmendRequested();
    }

    @Override
    public DomainTroubleReport cancelTroubleReport(TroubleReportId troubleReportId, String cancellationReason) {
        DomainTroubleReport troubleReport = troubleReportRepository.findByTroubleReportId(troubleReportId);

        DomainServiceProblem serviceProblem = troubleReport.getServiceProblem();

        serviceProblem.writeHistoryItem(
                TroubleReportCancelRequested,
                authorisedActorProvider.authorisedActor(),
                new Date()
        );

        troubleReport.writeHistoryItem(
                TroubleReportCancelRequested,
                authorisedActorProvider.authorisedActor(),
                new Date(),
                new Note(new NoteBuilder.NameValueNote("Cancellation reason", cancellationReason).asString())
        );

        troubleReport.cancelRequested();

        troubleReport.writeHistoryItem(EventDescription.TroubleReportCancelPending, SystemActor.Openreach, new Date());
        troubleReport.writeHistoryItem(EventDescription.TroubleReportCancelled, SystemActor.Openreach, new Date());
        serviceProblem.writeHistoryItem(EventDescription.TroubleReportCancelled, SystemActor.Openreach, new Date());
        troubleReport.updateStatusTo(TroubleReportStatus.Cancelled);

        return troubleReport;
    }

    @Override
    public void confirmEquipmentDisconnected(TroubleReportId troubleReportId) {
        DomainTroubleReport troubleReport = troubleReportRepository.findByTroubleReportId(troubleReportId);

        troubleReport.confirmEquipmentDisconnectedRequested();
        troubleReport.writeHistoryItem(TroubleReportConfirmEquipmentDisconnectedRequested, authorisedActorProvider.authorisedActor(), new Date());
        troubleReport.getServiceProblem().writeHistoryItem(TroubleReportConfirmEquipmentDisconnectedRequested, authorisedActorProvider.authorisedActor(), new Date());
    }
}
