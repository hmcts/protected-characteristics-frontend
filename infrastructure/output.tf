output "vaultUri" {
  value = "${data.azurerm_key_vault.pcq_key_vault.vault_uri}"
}

output "vaultName" {
  value = "${local.vaultName}"
}
