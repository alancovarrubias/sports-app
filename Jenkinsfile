pipeline {
    agent any
    stages {
         stage('build and push docker image') {
            environment {
                ECR_REPO_URL = "${env.ECR_REPO_URL}"
                AWS_DEFAULT_REGION = "${env.AWS_DEFAULT_REGION}"
                IMAGE_NAME = "${env.IMAGE_NAME}"
            }
            steps {
                script {
                    sh "docker build -t $IMAGE_NAME:latest -f $IMAGE_NAME/Dockerfile.prod $IMAGE_NAME"
                    sh "aws ecr get-login-password --region $AWS_DEFAULT_REGION | docker login --username AWS --password-stdin $ECR_REPO_URL"
                    sh "docker tag $IMAGE_NAME:latest $ECR_REPO_URL/$IMAGE_NAME:latest"
                    sh "docker push $ECR_REPO_URL/$IMAGE_NAME:latest"
                }
            }
        }
        stage('provision server') {
            steps {
                script {
                    dir('terraform') {
                        sh "terraform init"
                        sh "terraform apply --auto-approve"
                    }
                }
            }
        }
    }
}