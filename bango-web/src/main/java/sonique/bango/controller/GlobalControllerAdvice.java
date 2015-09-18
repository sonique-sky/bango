package sonique.bango.controller;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import sky.sns.spm.validation.SpmCodeAndMessage;
import sky.sns.spm.validation.SupermanException;
import sonique.bango.domain.RequestParameters;
import sonique.bango.domain.filter.Filter;
import sonique.bango.domain.sorter.Sorter;

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
    public RequestParameters requestParameters(
            @RequestParam(value = "limit", required = false) Integer limit,
            @RequestParam(value = "start", required = false) Integer start,
            @RequestParam(value = "sort", required = false) List<Sorter> sorters,
            @RequestParam(value = "filter", required = false) List<Filter> filters,
            @RequestParam(value = "group", required = false) Sorter group
    ) {
        return new RequestParameters(start, limit, sorters, filters, group);
    }
}
