package com.audio.transcriber.login;

import com.audio.transcriber.login.dto.LoginRequest;
import com.audio.transcriber.login.dto.RegisterRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class LoginService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public boolean registerUser(RegisterRequest registerRequest) {
        // Check if user already exists
        if (userRepository.existsByUsername(registerRequest.getUsername())) {
            return false;
        }
        if (userRepository.existsByEmail(registerRequest.getEmail())) {
            return false;
        }

        // Create new user
        User user = new User();
        user.setUsername(registerRequest.getUsername());
        user.setEmail(registerRequest.getEmail());
        user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));

        userRepository.save(user);
        return true;
    }

    public Optional<User> loginUser(LoginRequest loginRequest) {
        Optional<User> userOptional = userRepository.findByUsername(loginRequest.getUsername());
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            if (passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
                return userOptional;
            }
        }
        return Optional.empty();
    }
}