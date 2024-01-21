terraform {
  required_version = ">= 0.12"
  backend "s3" {
    bucket = "sports-app-buck"
    key    = "sports-app/state.tfstate"
    region = "us-west-1"
  }
}

variable "do_token" {}
variable "public_ssh_key" {}
variable "domain_name" {}

module "digitalocean" {
  source         = "./digitalocean"
  do_token       = var.do_token
  domain_name    = var.domain_name
  public_ssh_key = file(var.public_ssh_key)
}

output "server_ip" {
  value = module.digitalocean.ip_address
}
