// Infrastructural variables

variable "product" {}

variable "raw_product" {
  default = "pcq" // jenkins-library overrides product for PRs and adds e.g. pr-118-pcq
}

variable "microservice" {
  default = "pcq-frontend"
}

variable "location" {
  default = "UK South"
}

variable "env" {
  type = "string"
}

variable "ilbIp" { }

variable "node_config_dir" {
  // for Windows
  default = "D:\\home\\site\\wwwroot\\config"
}

variable "subscription" {}

variable "vault_section" {
  type = "string"
}

// CNP settings
variable "jenkins_AAD_objectId" {
  type                        = "string"
  description                 = "(Required) The Azure AD object ID of a user, service principal or security group in the Azure Active Directory tenant for the vault. The object ID must be unique for the list of access policies."
}

variable "tenant_id" {
  description = "(Required) The Azure Active Directory tenant ID that should be used for authenticating requests to the key vault. This is usually sourced from environemnt variables and not normally required to be specified."
}

variable "appinsights_instrumentation_key" {
  description = "Instrumentation key of the App Insights instance this webapp should use. Module will create own App Insights resource if this is not provided"
  default = ""
}
variable "node_env" {
  default = "production"
}

variable "node_path" {
  default = "."
}

variable "external_host_name" {
  type = "string"
}

// Package details
variable "packages_name" {
  default = "pcq-frontend"
}

variable "packages_project" {
  default = "pcq"
}

variable "packages_environment" {
  type = "string"
}

variable "packages_version" {
  default = "-1"
}

variable "version" {
  default = "-1"
}

variable "pcq_frontend_service_name" {
  default = "pcq-frontend"
}

variable "pcq_frontend_public_port" {
  default = "443"
}

variable "ga_tracking_url" {
  description = "Google Analytics tracking URL"
  default = "http://www.google-analytics.com/collect"
}

variable "redis_use_tls" {
  default = "true"  //always true in cnp
}

variable "reform_envirionment_for_test" {
  default = "prod"
}
variable "health_endpoint" {
  default = "/health"
}

variable "frontend_service_name" {
  default = "pcw-frontend"
}

variable "pcq_frontend_use_redis" {
  default = "false"
}

variable "pcq_frontend_https" {
  default = "false"
}

variable "pcq_frontend_protocol" {
  default = "https"
}

variable "enable_tracking" {
  default = "true"
}

//variable "pcq_google_track_id" {
//  description = "Google Analytics tracking ID"
//}

variable "reform_team" {
  default = "probate"
}

variable "capacity" {
  default = "1"
}

variable "common_tags" {
  type = "map"
}

variable "feature_toggles_api_url" {
  type = "string"
}

variable "asp_rg" {}

variable "asp_name" {}

variable "website_local_cache_option" {
  type = "string"
  default = "Never"
}

variable "website_local_cache_sizeinmb" {
  type = "string"
  default = "0"
}

variable "external_hostName_url" {
  default = ""
}
