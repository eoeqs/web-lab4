package web.back.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;

public class UsernameDecoder {
    public static String decodeUsername(String header) {
        Algorithm algorithm = Algorithm.HMAC256("secret".getBytes());

        JWTVerifier verifier = JWT.require(algorithm).build();
        DecodedJWT decodedJWT = verifier.verify(header);

        return decodedJWT.getSubject();
    }
}
