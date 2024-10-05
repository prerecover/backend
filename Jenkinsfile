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
                    dockerImage = docker.build("${env.DOCKER_IMAGE}")
                }
            }     
        }
    }
}
