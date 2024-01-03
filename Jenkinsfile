pipeline {
    agent any
    environment {
        ECR_REPO_URL = '678549062078.dkr.ecr.us-west-1.amazonaws.com'
        AWS_DEFAULT_REGION = 'us-west-1'
    }
    stages {
         stage('Build and Push Docker Image') {
            steps {
                script {
                    sh 'docker build -t client:latest -f client/Dockerfile.prod client'
                    sh "aws ecr get-login-password --region $AWS_DEFAULT_REGION | docker login --username AWS --password-stdin $ECR_REPO_URL"
                    sh "docker tag client:latest $ECR_REPO_URL/client:latest"
                    sh "docker push $ECR_REPO_URL/client:latest"
                }
            }
        }
    }
}