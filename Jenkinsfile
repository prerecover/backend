pipeline {
    agent any


    stages {
        stage('Docker') {
            steps {
                sh "docker build -t prerecover/backend"
                sh "docker push prerecover/backend"

            }    
        }
    }
}
