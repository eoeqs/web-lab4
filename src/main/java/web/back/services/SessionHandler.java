package web.back.services;

import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.HashMap;
import java.util.UUID;

@Component

public class SessionHandler {
    private final static HashMap<String, String> sessions = new HashMap<>();
    public String register(final String username) {
        if (username == null)
            return null;

        final String sessionID = generateSessionID();
        sessions.put(sessionID, username);
        return sessionID;
    }

    public String getUsernameForSession(final String sessionID) {
        return sessions.get(sessionID);
    }

    private String generateSessionID() {
        return new String(
                Base64.getEncoder().encode(
                        UUID.randomUUID().toString().getBytes(StandardCharsets.UTF_8)
                )
        );
    }

    public void invalidate(final String token) {
        sessions.remove(token);
    }
}
