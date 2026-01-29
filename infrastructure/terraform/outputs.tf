output "instance_public_ip" {
  description = "Public IP of the EC2 instance"
  value       = aws_instance.app_server.public_ip
}

output "private_key_path" {
  description = "Path to the private key"
  value       = local_file.ssh_key.filename
}
