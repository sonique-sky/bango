package sonique.bango.service;

import sky.sns.spm.domain.model.EventHistoryItem;
import sky.sns.spm.domain.model.RepairType;
import sky.sns.spm.domain.model.refdata.ServiceType;
import sky.sns.spm.domain.model.troublereport.DomainTroubleReport;
import sky.sns.spm.domain.model.troublereport.DomainTroubleReportSymptom;
import sky.sns.spm.web.spmapp.shared.dto.AvailableAppointmentDTO;
import sonique.bango.domain.troublereport.TroubleReportTemplate;
import spm.domain.ServiceProblemId;
import spm.domain.TroubleReportId;
import spm.pacman.domain.AppointmentTimeslot;

import java.util.Collection;
import java.util.Date;
import java.util.List;

public interface TroubleReportApiService {
    DomainTroubleReport troubleReportWithId(TroubleReportId troubleReportId);

    Collection<DomainTroubleReport> troubleReportsFor(ServiceProblemId serviceProblemId);

    TroubleReportTemplate templateFor(ServiceProblemId serviceProblemId);

    List<DomainTroubleReportSymptom> symptomsFor(ServiceType serviceType);

    void raiseTroubleReport(TroubleReportTemplate troubleReportTemplate);

    Collection<AvailableAppointmentDTO> availableAppointmentsFor(ServiceProblemId serviceProblemId, RepairType repairType, Date appointmentStartDate);

    String reserveAppointmentFor(ServiceProblemId serviceProblemId, RepairType repairType, Date date, AppointmentTimeslot appointmentTimeslot);

    List<EventHistoryItem> eventHistory(TroubleReportId troubleReportId);

    void confirmEquipmentDisconnected(TroubleReportId troubleReportId);

    DomainTroubleReport cancelTroubleReport(TroubleReportId troubleReportId, String cancellationReason);

    void amendTroubleReport(TroubleReportTemplate troubleReportTemplate);
}
