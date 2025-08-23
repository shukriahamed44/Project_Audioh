// File: LoginServiceTests.java
package com.audio.transcriber;

import com.audio.transcriber.login.LoginService;
import com.audio.transcriber.login.User;
import com.audio.transcriber.login.UserRepository;
import com.audio.transcriber.login.dto.RegisterRequest;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.security.crypto.password.PasswordEncoder;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@SpringBootTest(classes = LoginService.class)
@Import(LoginServiceTests.TestConfig.class)
public class LoginServiceTests {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private LoginService loginService;

    // ✅ Reset mocks before each test
    @BeforeEach
    void resetMocks() {
        reset(userRepository, passwordEncoder);
    }

    @Test
    void testRegisterUser_Success() {
        // Given
        RegisterRequest request = new RegisterRequest();
        request.setUsername("newuser");
        request.setEmail("newuser@example.com");
        request.setPassword("password123");

        // Mock
        when(userRepository.existsByUsername("newuser")).thenReturn(false);
        when(userRepository.existsByEmail("newuser@example.com")).thenReturn(false);
        when(passwordEncoder.encode("password123")).thenReturn("$2a$10$hashed");
        when(userRepository.save(any(User.class))).thenReturn(new User());

        // When
        boolean result = loginService.registerUser(request);

        // Then
        assertTrue(result);

        // Verify
        verify(userRepository).existsByUsername("newuser");
        verify(userRepository).existsByEmail("newuser@example.com");
        verify(passwordEncoder).encode("password123");
        verify(userRepository).save(any(User.class));
    }

    @Test
    void testRegisterUser_UsernameExists_ReturnsFalse() {
        // Given
        RegisterRequest request = new RegisterRequest();
        request.setUsername("existinguser");
        request.setEmail("newemail@example.com");
        request.setPassword("password123");

        // Mock: only username exists
        when(userRepository.existsByUsername("existinguser")).thenReturn(true);

        // Do NOT mock existsByEmail — we don't expect it to be called
        // But: verify it's NOT called
        when(userRepository.existsByEmail(anyString())).thenThrow(new IllegalStateException("Should not check email if username exists"));

        // When
        boolean result = loginService.registerUser(request);

        // Then
        assertFalse(result);

        // Verify email check never happens
        verify(userRepository, never()).existsByEmail(anyString());
        verify(userRepository, never()).save(any(User.class));
    }

    @Test
    void testRegisterUser_EmailExists_ReturnsFalse() {
        // Given
        RegisterRequest request = new RegisterRequest();
        request.setUsername("newuser");
        request.setEmail("existing@example.com");
        request.setPassword("password123");

        // Mock: username does NOT exist, email does
        when(userRepository.existsByUsername("newuser")).thenReturn(false);
        when(userRepository.existsByEmail("existing@example.com")).thenReturn(true);

        // When
        boolean result = loginService.registerUser(request);

        // Then
        assertFalse(result);
        verify(userRepository).existsByUsername("newuser");
        verify(userRepository).existsByEmail("existing@example.com");
        verify(userRepository, never()).save(any(User.class));
    }

    // ✅ Test config to provide mocks
    @Configuration
    static class TestConfig {
        @Bean
        public UserRepository userRepository() {
            return Mockito.mock(UserRepository.class);
        }

        @Bean
        public PasswordEncoder passwordEncoder() {
            return Mockito.mock(PasswordEncoder.class);
        }
    }
}