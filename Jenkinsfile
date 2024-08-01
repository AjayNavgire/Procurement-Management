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
                dir('backend') {
                    script {
                        // Check if PM2 is installed, and install it if not
                        sh 'if ! command -v pm2 &> /dev/null; then sudo npm install -g pm2; fi'

                        // Stop any existing PM2 process for the application (if running)
                        sh 'pm2 delete my-app || true'

                        // Start the application using PM2
                        sh 'pm2 start server.js --name my-app'
                    }
                }
            }
        }
    }

    post {
        success {
            // Notify success
            echo 'Deployment succeeded!'
        }
        failure {
            // Notify failure
            echo 'Deployment failed!'
        }
    }
}
