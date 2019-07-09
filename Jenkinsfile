pipeline {
    agent { docker { image 'node:11.15' } }
    stages {
        stage('build') {
            steps {
                sh 'npm --version'
            }
        }
    }
}
