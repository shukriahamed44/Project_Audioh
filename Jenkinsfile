pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-creds')  // your Docker Hub credentials ID
    }

    stages {
        // stage('Checkout') {
        //     steps {
        //         git branch: 'main',
        //             url: 'https://github.com/shukriahamed44/Project_Audioh.git',
        //             credentialsId: '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'   // <-- THIS MUST BE YOUR PAT CREDENTIAL ID
        //     }
        // }

        stage('Build Backend Docker Image') {
            steps {
                script {
                    sh "docker build -t project_audio_backend:latest ./audio/audio"
                }
            }
        }

        stage('Build Frontend Docker Image') {
            steps {
                script {
                    sh "docker build -t project_audio_frontend:latest ./audioh-frontend"
                }
            }
        }

        stage('Push to Docker Hub') {
            steps {
                script {
                    sh "echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin"
                    sh "docker tag project_audio_backend:latest shukriahamed44/project_audio_backend:latest"
                    sh "docker tag project_audio_frontend:latest shukriahamed44/project_audio_frontend:latest"
                    sh "docker push shukriahamed44/project_audio_backend:latest"
                    sh "docker push shukriahamed44/project_audio_frontend:latest"
                }
            }
        }
    }
}
