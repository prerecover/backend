pipeline {
    agent any
    environment {
        DOCKER_IMAGE = 'ternyavsky/backend'
    }
    stages {
        stage('Checkout'){
            steps {
                checkout scm
            }     
        }
        stage('Build'){
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', '7c8dc9e4-6fd4-4b0e-8423-a64e1f85b7fd'){
                        def dockerImage = docker.build("${env.DOCKER_IMAGE}")
                        dockerImage.push()
                        }
                }
            }     
        }
    }
}
