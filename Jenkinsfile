pipeline {
    agent any
    stages {
        stage('build and push docker image') {
            environment {
                ECR_REPO_URL = "${env.ECR_REPO_URL}"
                AWS_DEFAULT_REGION = "${env.AWS_DEFAULT_REGION}"
                IMAGE_NAMES = "${env.IMAGE_NAMES}"
                ENV = "${env.ENV}"
            }
            steps {
                script {
                    sh "aws ecr get-login-password --region $AWS_DEFAULT_REGION | docker login --username AWS --password-stdin $ECR_REPO_URL"
                    def imageNameArray = IMAGE_NAMES.split(',')
                    imageNameArray.each { IMAGE_NAME ->
                        sh "docker build -t $IMAGE_NAME:$ENV -f $image_name/Dockerfile.$ENV $IMAGE_NAME"
                        sh "docker tag $IMAGE_NAME:$ENV $ECR_REPO_URL/$IMAGE_NAME:$ENV"
                        sh "docker push $ECR_REPO_URL/$IMAGE_NAME:$ENV"
                    }
                }
            }
        }
    }
}