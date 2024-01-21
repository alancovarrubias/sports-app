resource "digitalocean_ssh_key" "default" {
  name       = "SSH Key"
  public_key = var.public_ssh_key
}

resource "digitalocean_droplet" "sports-app-web" {
  image    = "ubuntu-22-04-x64"
  name     = "sports-app-web"
  region   = "sfo2"
  size     = "s-2vcpu-2gb"
  ssh_keys = [digitalocean_ssh_key.default.fingerprint]
}
