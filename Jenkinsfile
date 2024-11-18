pipeline {
    agent any
    parameters {
        choice(name: 'ENV', choices: ['dev', 'stage', 'prod'], description: 'Select the environment')
        choice(name: 'IMAGE_NAME', choices: ['All', 'client', 'server', 'football', 'crawler'], description: 'Select the image name')
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
                    if (params.IMAGE_NAME == 'All') {
                        def imageNameArray = IMAGE_NAMES.split(',')
                        imageNameArray.each { IMAGE_NAME -> buildAndPushDockerImage(IMAGE_NAME) }
                    } else {
                        buildAndPushDockerImage(params.IMAGE_NAME)
                    }
                }
            }
        }
    }
}

def buildAndPushDockerImage(image_name) {
    sh "ENV=${params.ENV} docker-compose -f docker-compose.build.yml build ${image_name}"
    sh "docker tag ${image_name}:${params.ENV} $ECR_REPO_URL/${image_name}:${params.ENV}"
    sh "docker push $ECR_REPO_URL/${image_name}:${params.ENV}"
}