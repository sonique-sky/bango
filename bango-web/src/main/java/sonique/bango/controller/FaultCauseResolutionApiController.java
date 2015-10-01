package sonique.bango.controller;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import sky.sns.spm.domain.model.refdata.ServiceType;
import sky.sns.spm.web.spmapp.shared.dto.CauseDTO;
import sky.sns.spm.web.spmapp.shared.dto.FaultDTO;
import sky.sns.spm.web.spmapp.shared.dto.ResolutionReasonDTO;
import sonique.bango.domain.ResponseData;
import sonique.bango.service.FaultCauseResolutionApiService;

import javax.annotation.Resource;
import java.util.Collection;

@RestController
@RequestMapping("/api")
public class FaultCauseResolutionApiController {

    @Resource
    private FaultCauseResolutionApiService faultCauseResolutionApiService;

    @RequestMapping(value = "/faults/{serviceType}", method = RequestMethod.GET)
    public ResponseData<Collection<FaultDTO>> faultsFor(@PathVariable ServiceType serviceType) {
        return new ResponseData<>(faultCauseResolutionApiService.findFaults(serviceType));
    }

    @RequestMapping(value = "/causes/{serviceType}/{faultCode}", method = RequestMethod.GET)
    public ResponseData<Collection<CauseDTO>> causesFor(@PathVariable ServiceType serviceType, @PathVariable String faultCode) {
        return new ResponseData<>(faultCauseResolutionApiService.findCauses(serviceType, faultCode));
    }

    @RequestMapping(value = "/resolutionReasons/{serviceType}/{cause}", method = RequestMethod.GET)
    public ResponseData<Collection<ResolutionReasonDTO>> resolutionReasonsFor(@PathVariable ServiceType serviceType, @PathVariable String cause) {
        return new ResponseData<>(faultCauseResolutionApiService.findResolutionReasonsFor(serviceType, cause));
    }

}