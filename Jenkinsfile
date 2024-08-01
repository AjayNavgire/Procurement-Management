pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                // Checkout the repository from a specific branch
                git branch: 'main', url: 'https://github.com/AjayNavgire/Procurement-Management.git'
            }
        }
        stage('Deploy') {
            steps {
                script {
                    // Check if PM2 is installed, and install it if not
                    sh 'if ! command -v pm2 &> /dev/null; then npm install -g pm2; fi'

                    // Stop any existing PM2 process for the application (if running)
                    sh 'pm2 delete my-app || true'

                    // Start the application using PM2
                    sh 'pm2 start backend/server.js --name my-app'
                }
            }
        }
    }

    post {
        success {
            // Notify success
            echo 'Build and deployment succeeded!'
        }
        failure {
            // Notify failure
            echo 'Build or deployment failed!'
        }
    }
}
