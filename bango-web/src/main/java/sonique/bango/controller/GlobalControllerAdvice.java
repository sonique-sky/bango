package sonique.bango.controller;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import sky.sns.spm.validation.SpmCodeAndMessage;
import sky.sns.spm.validation.SupermanException;
import sky.sns.spm.web.spmapp.shared.dto.Filter;
import sky.sns.spm.web.spmapp.shared.dto.SearchParametersDTO;
import sky.sns.spm.web.spmapp.shared.dto.SortDescriptor;

import java.util.Collections;
import java.util.List;

@ControllerAdvice
public class GlobalControllerAdvice {
    @ResponseBody
    @ResponseStatus(value = HttpStatus.BAD_REQUEST)
    @ExceptionHandler(value = {SupermanException.class})
    public SpmCodeAndMessage handleException(SupermanException sex) {
        return sex.getCodeAndMessage();
    }

    @ModelAttribute
    public SearchParametersDTO searchParameters(
            @RequestParam(value = "limit", required = false) Integer limit,
            @RequestParam(value = "start", required = false) Integer start,
            @RequestParam(value = "sort", required = false) List<SortDescriptor> sorters,
            @RequestParam(value = "filter", required = false) List<Filter> filters,
            @RequestParam(value = "group", required = false) SortDescriptor group
    ) {
        return new SearchParametersDTO(
                start == null ? 0 : start,
                limit == null ? Integer.MAX_VALUE : limit,
                sorters == null ? Collections.<SortDescriptor>emptyList() : sorters,
                filters == null ? Collections.<Filter>emptyList() : filters,
                group
        );
    }
}
