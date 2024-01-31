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
                        sh "docker build -t $IMAGE_NAME:$ENV -f $image_name/Dockerfile.prod $IMAGE_NAME"
                        sh "docker tag $IMAGE_NAME:prod $ECR_REPO_URL/$IMAGE_NAME:prod"
                        sh "docker push $ECR_REPO_URL/$IMAGE_NAME:prod"
                    }
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
                        env.SERVER_IP = sh(script: 'terraform output server_ip', returnStdout: true).trim()
                    }
                }
            }
        }
        stage('copy files to ansible server') {
            environment {
                ANSIBLE_IP = "${env.ANSIBLE_IP}"
                REMOTE_USER = "${env.REMOTE_USER}"
            }
            steps {
                script {
                    sh "scp -r -o StrictHostKeyChecking=no ansible/* $REMOTE_USER@$ANSIBLE_IP:/home/alan"
                    sh "scp -r -o StrictHostKeyChecking=no /var/jenkins_home/.ssh/id_rsa* $REMOTE_USER@$ANSIBLE_IP:/home/alan/.ssh"
                    def remote = [:]
                    remote.name = "ansible_server"
                    remote.host = "$ANSIBLE_IP"
                    remote.allowAnyHosts = true
                    remote.user = "$REMOTE_USER"
                    remote.identityFile = "/var/jenkins_home/.ssh/id_rsa"
                    sshCommand remote: remote, command: "ansible-playbook --inventory $SERVER_IP, -e target_host_ip=$SERVER_IP --private-key ~/.ssh/id_rsa --user root deploy_app.yml"
                }
            }
        }
    }
}