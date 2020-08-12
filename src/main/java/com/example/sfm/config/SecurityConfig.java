package com.example.sfm.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {
	private static final String[] PUBLIC_MATCHERS = {
			"/**"
	};

    @Override
    protected void configure(HttpSecurity security) throws Exception
    {
     security.csrf().disable().cors().disable().httpBasic().and().authorizeRequests()
     .antMatchers(PUBLIC_MATCHERS).permitAll().anyRequest().authenticated();
    }
}