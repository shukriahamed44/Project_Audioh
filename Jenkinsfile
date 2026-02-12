pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-creds')
        AWS_ACCESS_KEY_ID     = credentials('aws-access-key-id')
        AWS_SECRET_ACCESS_KEY = credentials('aws-secret-access-key')
        ANSIBLE_HOST_KEY_CHECKING = 'False'
    }

    stages {
        // stage('Checkout') {
        //     steps {
        //         git branch: 'main',
        //             url: 'https://github.com/shukriahamed44/Project_Audioh.git',
        //             credentialsId: 'github-pat-creds'
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

        stage('Provision Infrastructure') {
            steps {
                dir('infrastructure/terraform') {
                    sh 'terraform init'
                    sh 'terraform plan'
                    sh 'terraform apply -auto-approve'
                }
            }
        }

        stage('Deploy to Production') {
            steps {
                script {
                    def public_ip = sh(script: "terraform -chdir=infrastructure/terraform output -raw instance_public_ip", returnStdout: true).trim()
                    echo "========================================"
                    echo "DEPLOYING TO IP: ${public_ip}"
                    echo "========================================"
                    
                    // Wait for SSH to be ready on fresh instance
                    sleep 60 

                    dir('infrastructure/ansible') {
                        sh "chmod 400 ../terraform/project_audio_key.pem"
                        withEnv(["TARGET_IP=${public_ip}"]) {
                            sh '''ansible-playbook \
                                -i "${TARGET_IP}," \
                                -u ubuntu \
                                --private-key ../terraform/project_audio_key.pem \
                                -e "dockerhub_password=${DOCKERHUB_CREDENTIALS_PSW} dockerhub_username=${DOCKERHUB_CREDENTIALS_USR}" \
                                deploy.yml'''
                        }
                    }
                }
            }
        }
    }

    post {
        always {
            sh "docker logout"
        }
    }
}
