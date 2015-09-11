package sonique.bango.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.*;
import sky.sns.spm.validation.SpmCodeAndMessage;
import sky.sns.spm.validation.SupermanException;
import sonique.bango.domain.sorter.JsonSortDataParameterParser;
import sonique.bango.domain.sorter.Sorter;

@ControllerAdvice
public class GlobalControllerExtension {
    private JsonSortDataParameterParser sortDataParameterParser;

    @ResponseBody
    @ResponseStatus(value = HttpStatus.BAD_REQUEST)
    @ExceptionHandler(value = {SupermanException.class})
    public SpmCodeAndMessage handleException(SupermanException sex) {
        return sex.getCodeAndMessage();
    }

    @Autowired
    public void setObjectMapper(ObjectMapper objectMapper) {
        this.sortDataParameterParser = new JsonSortDataParameterParser(objectMapper);
    }

    @InitBinder({"sort"})
    public void initBinder(final WebDataBinder webDataBinder) {
        webDataBinder.registerCustomEditor(Sorter[].class, sortDataParameterParser);
    }
}
