pipeline {
    agent any

    environment {
        // Iknology
        //HARBOR_CREDENTIALS = 'harbor-iknology' // Replace with your credentials ID
        //HARBOR_REGISTRY = 'https://hcr.iknology.com' // Replace with your Harbor domain
        //IMAGE_NAME = 'hcr.iknology.com/hospitality/backend'
        //IMAGE_TAG = 'stage'
        //VITE_BASE_URL = 'http://localhost:8080/'

        // Takamol
        HARBOR_CREDENTIALS = 'harbor-takamol' // Replace with your credentials ID
        HARBOR_REGISTRY = 'https://harbor.takamoldemo.net' // Replace with your Harbor domain
        IMAGE_NAME = 'harbor.takamoldemo.net/hospitality/frontend'
        IMAGE_TAG = 'prod'
        VITE_BASE_URL = 'https://hospitality-api.takamol.sa/'
        // IMAGE_TAG = 'stage'
        // VITE_BASE_URL = 'https://hospitality-api.takamoldemo.net/'
    }

    stages {
        stage('Checkout') {
            steps {
                // Checkout the code from the repository
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                // Install npm dependencies
                nodejs(nodeJSInstallationName: '22.x') {
                    sh 'npm install'
                }
            }
        }

        stage('Build Project') {
            steps {
                // Build the React application
                nodejs(nodeJSInstallationName: '22.x') {
                    sh 'npm run build'
                }
            }
        }

        // stage('Archive Artifacts') {
        //     steps {
        //         // Archive the build artifacts
        //         archiveArtifacts artifacts: 'build/**', fingerprint: true
        //     }
        // }

        stage('Prepare Dockerfile') {
            steps {
                script {
                    writeFile file: 'Dockerfile', text: '''
                    FROM nginx:stable-alpine
                    COPY build /usr/share/nginx/html
                    EXPOSE 80
                    CMD ["nginx", "-g", "daemon off;"]
                    '''
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    sh "docker build -t ${IMAGE_NAME}:${IMAGE_TAG} ."
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                script {
                    docker.withRegistry(env.HARBOR_REGISTRY, env.HARBOR_CREDENTIALS) {
                        sh "docker push ${IMAGE_NAME}:${IMAGE_TAG}"
                    }
                }
            }
        }

        stage('Deploy') {
            steps {
                // Deploy the build artifacts to the desired location
                echo 'Deploying the build...'
            }
        }
    }

    post {
        always {
            // Clean up the workspace
            cleanWs()
        }
        success {
            echo 'Build completed successfully!'
        }
        failure {
            echo 'Build failed.'
        }
    }
}
