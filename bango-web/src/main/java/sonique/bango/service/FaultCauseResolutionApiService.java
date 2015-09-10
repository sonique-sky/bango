package sonique.bango.service;

import sky.sns.spm.domain.model.refdata.ServiceType;
import sky.sns.spm.web.spmapp.shared.dto.CauseDTO;
import sky.sns.spm.web.spmapp.shared.dto.FaultDTO;
import sky.sns.spm.web.spmapp.shared.dto.ResolutionReasonDTO;

import java.util.Collection;

public interface FaultCauseResolutionApiService {

    Collection<FaultDTO> findFaults(ServiceType serviceType);
    Collection<CauseDTO> findCauses(ServiceType serviceType, String faultCode);
    Collection<ResolutionReasonDTO> findResolutionReasonsFor(ServiceType serviceType, String cause);
}
