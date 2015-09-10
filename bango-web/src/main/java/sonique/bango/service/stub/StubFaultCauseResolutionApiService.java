package sonique.bango.service.stub;

import sky.sns.spm.domain.model.refdata.ServiceType;
import sky.sns.spm.web.spmapp.shared.dto.CauseDTO;
import sky.sns.spm.web.spmapp.shared.dto.FaultDTO;
import sky.sns.spm.web.spmapp.shared.dto.ResolutionReasonDTO;
import sonique.bango.service.FaultCauseResolutionApiService;

import java.util.Collection;

import static java.util.Arrays.asList;
import static sonique.datafixtures.PrimitiveDataFixtures.someWords;
import static util.SupermanDataFixtures.*;

public class StubFaultCauseResolutionApiService implements FaultCauseResolutionApiService {

    @Override
    public Collection<FaultDTO> findFaults(ServiceType serviceType) {
        return asList(
                new FaultDTO(someFaultCode().asString(), someWords()),
                new FaultDTO(someFaultCode().asString(), someWords()),
                new FaultDTO(someFaultCode().asString(), someWords()),
                new FaultDTO(someFaultCode().asString(), someWords())
        );
    }

    @Override
    public Collection<CauseDTO> findCauses(ServiceType serviceType, String faultCode) {
        return asList(
                new CauseDTO(someCauseCode(), someWords()),
                new CauseDTO(someCauseCode(), someWords()),
                new CauseDTO(someCauseCode(), someWords()),
                new CauseDTO(someCauseCode(), someWords())
        );
    }

    @Override
    public Collection<ResolutionReasonDTO> findResolutionReasonsFor(ServiceType serviceType, String cause) {
        return asList(
                new ResolutionReasonDTO(someResolutionReason().resolutionReasonCode(), someWords()),
                new ResolutionReasonDTO(someResolutionReason().resolutionReasonCode(), someWords()),
                new ResolutionReasonDTO(someResolutionReason().resolutionReasonCode(), someWords()),
                new ResolutionReasonDTO(someResolutionReason().resolutionReasonCode(), someWords())
        );
    }
}
