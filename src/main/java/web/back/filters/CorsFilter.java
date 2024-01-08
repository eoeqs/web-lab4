//package web.back.filters;
//
//import jakarta.servlet.FilterChain;
//import jakarta.servlet.ServletException;
//import jakarta.servlet.annotation.WebFilter;
//import jakarta.servlet.http.HttpServletRequest;
//import jakarta.servlet.http.HttpServletResponse;
//import org.springframework.stereotype.Component;
//import org.springframework.web.filter.OncePerRequestFilter;
//
//import java.io.IOException;
//
//@Component
//@WebFilter
//public class CorsFilter extends OncePerRequestFilter {
//
//    @Override
//    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
//            throws ServletException, IOException {
//
//        response.addHeader("Access-Control-Allow-Origin", "*");
//        response.addHeader("Access-Control-Allow-Headers", "origin, content-type, accept, authorization");
//        response.addHeader("Access-Control-Allow-Credentials", "true");
//        response.addHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, HEAD");
//        response.addHeader("Access-Control-Max-Age", "1209600");
//
//        if (request.getMethod().equals("OPTIONS")) {
//            response.setStatus(HttpServletResponse.SC_OK);
//        } else {
//            filterChain.doFilter(request, response);
//        }
//    }
//}