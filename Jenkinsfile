pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = 'dockerhub-creds' // We'll create this in Jenkins
        FRONTEND_IMAGE = 'shukriahamed44/project_audio_frontend:latest'
        BACKEND_IMAGE = 'shukriahamed44/project_audio_backend:latest'
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/shukriahamed44/Project_Audioh.git'
            }
        }

        stage('Build Backend Docker Image') {
            steps {
                script {
                    docker.build("${BACKEND_IMAGE}", "audio/audio")
                }
            }
        }

        stage('Build Frontend Docker Image') {
            steps {
                script {
                    docker.build("${FRONTEND_IMAGE}", "audioh-frontend")
                }
            }
        }

        stage('Push to Docker Hub') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-creds', usernameVariable: 'DOCKERHUB_USER', passwordVariable: 'DOCKERHUB_PASS')]) {
                    sh """
                    echo $DOCKERHUB_PASS | docker login -u $DOCKERHUB_USER --password-stdin
                    docker push ${BACKEND_IMAGE}
                    docker push ${FRONTEND_IMAGE}
                    """
                }
            }
        }
    }
}
