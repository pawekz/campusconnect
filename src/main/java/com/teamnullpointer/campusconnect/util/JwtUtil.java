package com.teamnullpointer.campusconnect.util;

import  io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.slf4j.LoggerFactory;
import org.slf4j.Logger;

import javax.crypto.SecretKey;
import java.security.Key;
import java.util.Date;

public class JwtUtil {
    private static final String SECRET_KEY_STRING = "slf7U9yY43iscTylNEORsRcr1VnDSbNZ";
    private static final Key SECRET_KEY = Keys.hmacShaKeyFor(SECRET_KEY_STRING.getBytes());
    private static final long EXPIRATION_TIME = 1000 * 60 * 60 * 24; // 24 hours
    private static final Logger logger = LoggerFactory.getLogger(JwtUtil.class);

    public static String generateToken(String email, String userType) {
        String token = Jwts.builder()
                .setSubject(email)
                .claim("user_type", userType)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(SECRET_KEY)
                .compact();
        logger.debug("Generated JWT Token: {}", token);
        return token;
    }

/*public static String validateToken(String token) {
    try {
        Claims claims = Jwts.parser()
                .verifyWith((SecretKey) SECRET_KEY)
                .build()
                .parseSignedClaims(token)
                .getPayload();
        return claims.getSubject();
    } catch (Exception e) {
        return null;
    }
}*/
public static Claims validateToken(String token) {
    try {
        Claims claims = Jwts.parser()
                .setSigningKey(SECRET_KEY)
                .build()
                .parseClaimsJws(token)
                .getBody();
        logger.debug("Validated JWT Token: {}", token);
        return claims;
    } catch (Exception e) {
        logger.error("Error validating JWT Token: {}", token, e);
        return null;
    }
}
}