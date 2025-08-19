package com.audio.transcriber.login;

import com.audio.transcriber.login.dto.LoginRequest;
import com.audio.transcriber.login.dto.RegisterRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class LoginController {

    @Autowired
    private LoginService loginService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest registerRequest) {
        boolean success = loginService.registerUser(registerRequest);
        if (success) {
            return ResponseEntity.ok().body("User registered successfully");
        } else {
            return ResponseEntity.badRequest().body("Username or email already exists");
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        var user = loginService.loginUser(loginRequest);
        if (user.isPresent()) {
            // Return user info including ID
            return ResponseEntity.ok().body(new LoginResponse(user.get().getId(), user.get().getUsername()));
        } else {
            return ResponseEntity.status(401).body("Invalid credentials");
        }
    }
}

// Add this DTO
class LoginResponse {
    private Long userId;
    private String username;

    public LoginResponse(Long userId, String username) {
        this.userId = userId;
        this.username = username;
    }

    // Getters and setters
    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
}