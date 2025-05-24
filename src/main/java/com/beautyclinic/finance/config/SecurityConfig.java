package com.beautyclinic.finance.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        // Configuração para desabilitar autenticação temporariamente
        http
            .csrf((csrf) -> csrf.disable())
            .authorizeHttpRequests((authorize) -> authorize
                .requestMatchers("/**").permitAll() // Permite acesso a todos os caminhos
            )
            .formLogin((form) -> form.disable()) // Desabilita o formulário de login
            .httpBasic((basic) -> basic.disable()); // Desabilita autenticação básica
            
        return http.build();
    }
} 