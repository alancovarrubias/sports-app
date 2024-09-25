pipeline {
    agent any
    parameters {
        choice(name: 'ENV', choices: ['dev', 'stage', 'prod'], description: 'Select the environment')
    }
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
                        sh "docker build -t $IMAGE_NAME:${params.ENV} -f $IMAGE_NAME/Dockerfile.${params.ENV} $IMAGE_NAME"
                        sh "docker tag $IMAGE_NAME:${params.ENV} $ECR_REPO_URL/$IMAGE_NAME:${params.ENV}"
                        sh "docker push $ECR_REPO_URL/$IMAGE_NAME:${params.ENV}"
                    }
                }
            }
        }
    }
}