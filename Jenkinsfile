pipeline {
    agent any
    environment {
        ECR_REPO_URL = '678549062078.dkr.ecr.us-west-1.amazonaws.com'
        AWS_DEFAULT_REGION = 'us-west-1'
        IMAGE_NAME = 'client'
    }
    stages {
         stage('Build and Push Docker Image') {
            steps {
                script {
                    sh "docker build -t $IMAGE_NAME:latest -f $IMAGE_NAME/Dockerfile.prod $IMAGE_NAME"
                    sh "aws ecr get-login-password --region $AWS_DEFAULT_REGION | docker login --username AWS --password-stdin $ECR_REPO_URL"
                    sh "docker tag $IMAGE_NAME:latest $ECR_REPO_URL/$IMAGE_NAME:latest"
                    sh "docker push $ECR_REPO_URL/$IMAGE_NAME:latest"
                }
            }
        }
    }
}