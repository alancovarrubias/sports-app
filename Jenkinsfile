pipeline {
    agent any
    stages {
        stage('copy files to ansible server') {
            environment {
                ANSIBLE_IP = "${env.ANSIBLE_IP}"
            }
            steps {
                script {
                    sh "scp -o StrictHostKeyChecking=no terraform/* root@$ANSIBLE_IP:/root"
                }
            }
        }
        stage('provision server') {
            environment {
                TF_VAR_domain_name = "${env.DOMAIN_NAME}"
                TF_VAR_public_ssh_key  = "${env.PUBLIC_SSH_KEY}"
                TF_VAR_do_token     = "${env.DO_TOKEN}"
            }
            steps {
                script {
                    dir('terraform') {
                        sh "terraform init"
                        sh "terraform apply --auto-approve"
                    }
                }
            }
        }
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
    }
}