package web.back.security;

import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import java.io.IOException;

public class AuthenticationFilterWrapper implements Filter {
    private final UsernamePasswordAuthenticationFilter authenticationFilter;

    public AuthenticationFilterWrapper(UsernamePasswordAuthenticationFilter authenticationFilter) {
        this.authenticationFilter = authenticationFilter;
    }

    @Override
    public void doFilter(javax.servlet.ServletRequest request, javax.servlet.ServletResponse response, FilterChain chain) throws IOException, ServletException {
        authenticationFilter.doFilter(request, response, chain);

    }

}
