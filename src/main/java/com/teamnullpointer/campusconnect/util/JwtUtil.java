package com.teamnullpointer.campusconnect.util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

import javax.crypto.SecretKey;
import java.security.Key;
import java.util.Date;

public class JwtUtil {
    private static final String SECRET_KEY_STRING = "b3BlbnNzaC1rZXktdjEAAAAABG5vbmUAAAAEbm9uZQAAAAAAAAABAAAAlwAAAAdzc2gtcn\n" +
            "NhAAAAAwEAAQAAAIEAwH52UiFREYSNufhy+nOq6umaXopbhcvwquO3jVnTQbgfzkxPU9Kp\n" +
            "xD9kVC/6eBBf1u3IZ911uJ9O1JHPVa4FVkH+6psjPqcdztuVxoqE/8fNcTgfh0LudkO+jk\n" +
            "bEx3ugRzZ9zdTfo9gb0j1JGKYNC4VJR9NMqhfupxMxc6NzHYsAAAIQzdpbvM3aW7wAAAAH\n" +
            "c3NoLXJzYQAAAIEAwH52UiFREYSNufhy+nOq6umaXopbhcvwquO3jVnTQbgfzkxPU9KpxD\n" +
            "9kVC/6eBBf1u3IZ911uJ9O1JHPVa4FVkH+6psjPqcdztuVxoqE/8fNcTgfh0LudkO+jkbE\n" +
            "x3ugRzZ9zdTfo9gb0j1JGKYNC4VJR9NMqhfupxMxc6NzHYsAAAADAQABAAAAgQCWi5EQBJ\n" +
            "x5fdi15FhQBdxbYp1naP/RMUGk9Pld5C1zjYPafRXhcbVyFT3rFabm9a9u0YLVsH7cCEPH\n" +
            "vc2QrcvfYalshedJND2fwpnQJ2osvDstgyIozpJuyfIxIxDHcKHOeNQWylcRlPe3/Pcw9I\n" +
            "BEVvipwDv0OlAaljcaPfKC+QAAAEEAv3ItpXUD2SyRr0vabqTUXeK1e6GIGbRAyfg8yfqg\n" +
            "RRZiNfaNR/M1HVus2iCjNdQjeiH7Zc5QLEQJQSDsZgKxIwAAAEEA59upULrCaJpfudlIik\n" +
            "5VTa1aJkMuFdHBJwiH0+03FqJEXG0FhpogvR3FXxMFrz/NlvtqmZkNqyx0CfpTbMohrQAA\n" +
            "AEEA1ImGNcGb6uOcXLCqhuCSmcWUIP26UC7qhduxvklTBfupw6v7jbWG9guqddZjI7UWsm\n" +
            "N1FTE6kZFAn/MxB7tTFwAAABlhY3RlLXRlY2hub2xvZ3ktZ2VuZXJhdGVk";
    private static final Key SECRET_KEY = Keys.hmacShaKeyFor(SECRET_KEY_STRING.getBytes());
    private static final long EXPIRATION_TIME = 1000 * 60 * 60 * 10; // 10 hours

    public static String generateToken(String email) {
        return Jwts.builder()
                .setSubject(email)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(SECRET_KEY)
                .compact();
    }

public static String validateToken(String token) {
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
}
}