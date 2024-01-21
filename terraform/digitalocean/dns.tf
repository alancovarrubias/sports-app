resource "digitalocean_domain" "default" {
  name       = var.domain_name
  ip_address = digitalocean_droplet.sports-app-web.ipv4_address
}

resource "digitalocean_record" "www" {
  domain = digitalocean_domain.default.id
  type   = "A"
  name   = "www"
  value  = digitalocean_droplet.sports-app-web.ipv4_address
}
