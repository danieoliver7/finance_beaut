package com.beautyclinic.finance.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class DashboardController {

    @GetMapping("/")
    public String index() {
        return "index";
    }
    
    @GetMapping("/dashboard")
    public String dashboard() {
        return "dashboard";
    }
    
    @GetMapping("/agendamentos")
    public String agendamentosView() {
        return "agendamentos";
    }
    
    @GetMapping("/profissionais")
    public String profissionaisView() {
        return "profissionais";
    }
} 