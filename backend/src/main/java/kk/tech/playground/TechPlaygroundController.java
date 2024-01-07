package kk.tech.playground;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TechPlaygroundController {

    @GetMapping("/")
    public String index() {
        return "Tech playground";
    }
}
