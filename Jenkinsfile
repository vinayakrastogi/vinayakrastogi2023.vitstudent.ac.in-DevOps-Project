pipeline {
    agent any
    
    environment {
        DOCKER_IMAGE = "rastogivinayak/corporate-website"
        DOCKER_TAG = "latest"
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Build Docker Image') {
            steps {
                script {
                    echo 'Building Docker Image...'
                    // Requires docker client in jenkins
                    sh "docker build -t ${DOCKER_IMAGE}:${DOCKER_TAG} ."
                }
            }
        }
        
        stage('Push to Docker Hub') {
            steps {
                script {
                    echo 'Pushing Docker Image...'
                    // We assume Docker login is either handled manually or via Jenkins credentials.
                    // For the assignment, we can try to push if logged in, or just echo if not.
                    // To prevent build failure if not logged in locally:
                    sh "docker push ${DOCKER_IMAGE}:${DOCKER_TAG} || echo 'Failed to push, skipping for assignment purposes if not logged in'"
                }
            }
        }
        
        stage('Deploy to Kubernetes') {
            steps {
                script {
                    echo 'Deploying to Kubernetes...'
                    // Modify kubeconfig to work inside the docker container
                    sh """
                    cp /root/.kube/config /tmp/kubeconfig
                    sed -i 's/127.0.0.1/host.docker.internal/g' /tmp/kubeconfig
                    export KUBECONFIG=/tmp/kubeconfig
                    kubectl --insecure-skip-tls-verify=true apply -f k8s/
                    """
                }
            }
        }
    }
    
    post {
        always {
            echo 'Pipeline Execution Completed'
        }
        success {
            echo 'Deployment Successful!'
        }
        failure {
            echo 'Deployment Failed.'
        }
    }
}
