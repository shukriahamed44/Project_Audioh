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

    HttpHeaders headers = new HttpHeaders();
    RestClient.Builder restClientBuilder = RestClient.builder();
    ResponseErrorHandler errorHandler = new DefaultResponseErrorHandler();
    WebClient.Builder webClientBuilder = WebClient.builder();

    ApiKey apiKey = new ApiKey() {
        @Override
        public String getValue() {
            return "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";
        }
    };

        @Bean
        public OpenAiAudioTranscriptionModel openAiAudioTranscriptionModel(RestClient.Builder restClientBuilder) {
            // Pass the non-null restClientBuilder here

            return new OpenAiAudioTranscriptionModel(new OpenAiAudioApi("https://api.openai.com",
                    apiKey,
                    headers,
                    restClientBuilder,
                    webClientBuilder,
                    errorHandler));
        }

}
