package com.audio.transcriber;


import org.springframework.ai.audio.transcription.AudioTranscriptionPrompt;
import org.springframework.ai.audio.transcription.AudioTranscriptionResponse;
import org.springframework.ai.model.ApiKey;
import org.springframework.ai.openai.OpenAiAudioTranscriptionModel;
import org.springframework.ai.openai.OpenAiAudioTranscriptionOptions;
import org.springframework.ai.openai.api.OpenAiApi;
import org.springframework.ai.openai.api.OpenAiAudioApi;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.DefaultResponseErrorHandler;
import org.springframework.web.client.ResponseErrorHandler;
import org.springframework.web.client.RestClient;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.reactive.function.client.WebClient;

import java.io.File;
import java.io.IOException;

@RestController
@RequestMapping("api/transcribe")
public class TranscriptionController {
    public final OpenAiAudioTranscriptionModel transcriptionModel;

    //A Constructor
    //Instantiates the API class/method w the api and parses it in to create a (transcriber)model(instance)
    public TranscriptionController(){
    //ApiKey apiKey = ApiKey.of(apikey);
        ApiKey apiKey = new ApiKey() {
            @Override
            public String getValue() {
                return "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";
            }
        };

        //kinda initializing/ declaring the header, restClient builder and shi.
        // here for the 4th parameter restClient, it needa be defined in a separate class (OpenAiConfig)
        //Hardcoded API key here should be taken care of
        HttpHeaders headers = new HttpHeaders();
        RestClient.Builder restClientBuilder = RestClient.builder();
        ResponseErrorHandler errorHandler = new DefaultResponseErrorHandler();
        WebClient.Builder webClientBuilder = WebClient.builder();

        OpenAiAudioApi openAiAudioApi = new OpenAiAudioApi(
                "https://api.openai.com",
                apiKey,
                headers,
                restClientBuilder,
                webClientBuilder,
                errorHandler

        );
        this.transcriptionModel =  new OpenAiAudioTranscriptionModel(openAiAudioApi);
    }


    //RequestParam asks for a file to be uploaded(multipartfile keyword for uploading files) and gets it as "file"
    //Creates an object "tempFile" (of type File) and transfers "file" to "tempFile" (Package item No.1)
    //Creates Transcription Options (kinda the prompt) (Package No.2) -> Bundles Package items 1 and 2 into "transcription request"
    // "transcriptionModel"(the model we created).call -> sends the prompt and gets the output and puts it into response
    @PostMapping
    public ResponseEntity<String> transcribeAudio(
            @RequestParam("file")MultipartFile file) throws IOException {
        File tempFile = File.createTempFile("audio", ".wav");
        file.transferTo(tempFile);

        OpenAiAudioTranscriptionOptions transcriptionOptions = OpenAiAudioTranscriptionOptions.builder()
                .responseFormat(OpenAiAudioApi.TranscriptResponseFormat.TEXT)
                .temperature(0f)
                .build();

        FileSystemResource audioFile = new FileSystemResource(tempFile);

        AudioTranscriptionPrompt transcriptionRequest = new AudioTranscriptionPrompt(audioFile, transcriptionOptions);
        AudioTranscriptionResponse response = transcriptionModel.call(transcriptionRequest);

        tempFile.delete();
        return new ResponseEntity<>(response.getResult().getOutput(), HttpStatus.OK);

    }

}
