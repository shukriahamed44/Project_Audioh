package com.audio.transcriber;

import org.springframework.ai.model.ApiKey;
import org.springframework.ai.openai.OpenAiAudioTranscriptionModel;
import org.springframework.ai.openai.api.OpenAiApi;
import org.springframework.ai.openai.api.OpenAiAudioApi;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.web.client.DefaultResponseErrorHandler;
import org.springframework.web.client.ResponseErrorHandler;
import org.springframework.web.client.RestClient;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
public class OpenAiConfig {

    @Bean
    public RestClient.Builder restClientBuilder() {
        return RestClient.builder();
    }

    @Value("${spring.ai.openai.api-key}")
    private String apiKeyString;

    @Bean
    public OpenAiAudioTranscriptionModel openAiAudioTranscriptionModel(RestClient.Builder restClientBuilder) {
        HttpHeaders headers = new HttpHeaders();
        ResponseErrorHandler errorHandler = new DefaultResponseErrorHandler();
        WebClient.Builder webClientBuilder = WebClient.builder();

        ApiKey apiKey = new ApiKey() {
            @Override
            public String getValue() {
                return apiKeyString;
            }
        };

        return new OpenAiAudioTranscriptionModel(new OpenAiAudioApi("https://api.openai.com",
                apiKey,
                headers,
                restClientBuilder,
                webClientBuilder,
                errorHandler));
    }

}
