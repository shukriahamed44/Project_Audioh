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

    public TranscriptionController(OpenAiAudioTranscriptionModel transcriptionModel) {
        this.transcriptionModel = transcriptionModel;
    }

    // RequestParam asks for a file to be uploaded(multipartfile keyword for
    // uploading files) and gets it as "file"
    // Creates an object "tempFile" (of type File) and transfers "file" to
    // "tempFile" (Package item No.1)
    // Creates Transcription Options (kinda the prompt) (Package No.2) -> Bundles
    // Package items 1 and 2 into "transcription request"
    // "transcriptionModel"(the model we created).call -> sends the prompt and gets
    // the output and puts it into response
    @PostMapping
    public ResponseEntity<String> transcribeAudio(
            @RequestParam("file") MultipartFile file) throws IOException {
        String originalFilename = file.getOriginalFilename();
        String extension = ".wav";
        if (originalFilename != null && originalFilename.contains(".")) {
            extension = originalFilename.substring(originalFilename.lastIndexOf("."));
        }

        System.out.println(
                "[TRANSCRIPTION] Received file: " + originalFilename + " | size: " + file.getSize() + " bytes");

        File tempFile = File.createTempFile("audio", extension);
        tempFile.delete(); // delete the empty file so copy can write fresh
        java.nio.file.Files.copy(file.getInputStream(), tempFile.toPath());

        System.out.println("[TRANSCRIPTION] Temp file size: " + tempFile.length() + " bytes");

        OpenAiAudioTranscriptionOptions transcriptionOptions = OpenAiAudioTranscriptionOptions.builder()
                .responseFormat(OpenAiAudioApi.TranscriptResponseFormat.TEXT)
                .temperature(0f)
                .build();

        FileSystemResource audioFile = new FileSystemResource(tempFile);

        AudioTranscriptionPrompt transcriptionRequest = new AudioTranscriptionPrompt(audioFile, transcriptionOptions);
        AudioTranscriptionResponse response = transcriptionModel.call(transcriptionRequest);

        String output = response.getResult().getOutput();
        System.out.println("[TRANSCRIPTION] Output length: " + (output != null ? output.length() : "null"));
        System.out.println("[TRANSCRIPTION] Output: " + output);

        tempFile.delete();
        return new ResponseEntity<>(output, HttpStatus.OK);

    }

}
