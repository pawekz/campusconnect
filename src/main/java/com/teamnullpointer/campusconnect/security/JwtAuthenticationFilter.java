package com.teamnullpointer.campusconnect.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;
import com.teamnullpointer.campusconnect.util.JwtUtil;
import io.jsonwebtoken.Claims;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import java.util.Collections;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private static final Logger logger = LoggerFactory.getLogger(JwtAuthenticationFilter.class);

@Override
protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
        throws ServletException, IOException {
    String header = request.getHeader("Authorization");
    logger.debug("Authorization Header: {}", header);

    if (header != null && header.startsWith("Bearer ")) {
        String token = header.substring(7);
        logger.debug("JWT Token: {}", token);
        Claims claims = JwtUtil.validateToken(token);

        if (claims != null) {
            String email = claims.getSubject();
            String userType = claims.get("user_type", String.class);
            logger.debug("Authenticated user: {}, with role: {}", email, userType);
            List<SimpleGrantedAuthority> authorities =
                    Collections.singletonList(new SimpleGrantedAuthority(userType));
            UsernamePasswordAuthenticationToken authentication =
                    new UsernamePasswordAuthenticationToken(email, null, authorities);
            SecurityContextHolder.getContext().setAuthentication(authentication);
        } else {
            logger.debug("Invalid JWT Token");
        }
    } else {
        logger.debug("No JWT Token found in request headers");
    }

    filterChain.doFilter(request, response);
}
}