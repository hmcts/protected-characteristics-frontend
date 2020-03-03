provider "azurerm" {
  version = "1.22.1"
}

locals {
  aseName = "core-compute-${var.env}"
  previewVaultName = "${var.raw_product}-aat"
  nonPreviewVaultName = "${var.raw_product}-${var.env}"
  vaultName = "${(var.env == "preview" || var.env == "spreview") ? local.previewVaultName : local.nonPreviewVaultName}"
  localenv = "${(var.env == "preview" || var.env == "spreview") ? "aat": "${var.env}"}"
  pcq_internal_base_url = "http://pcq-frontend-${local.localenv}.service.core-compute-${local.localenv}.internal"
}

data "azurerm_subnet" "core_infra_redis_subnet" {
  name                 = "core-infra-subnet-1-${var.env}"
  virtual_network_name = "core-infra-vnet-${var.env}"
  resource_group_name = "core-infra-${var.env}"
}

module "pcq-frontend-redis-cache" {
  source   = "git@github.com:hmcts/cnp-module-redis?ref=master"
  product     = "${(var.env == "preview" || var.env == "spreview") ? "${var.product}-${var.microservice}-pr-redis" : "${var.product}-${var.microservice}-redis-cache"}"
  location = "${var.location}"
  env      = "${var.env}"
  subnetid = "${data.azurerm_subnet.core_infra_redis_subnet.id}"
  common_tags  = "${var.common_tags}"
}

data "azurerm_key_vault" "pcq_key_vault" {
  name = "${local.vaultName}"
  resource_group_name = "${local.vaultName}"
}

module "pcq-frontend" {
  source = "git@github.com:hmcts/cnp-module-webapp?ref=master"
  product = "${var.product}-${var.microservice}"
  location = "${var.location}"
  env = "${var.env}"
  ilbIp = "${var.ilbIp}"
  is_frontend = "${var.env != "preview" ? 1: 0}"
  subscription = "${var.subscription}"
  asp_name     = "${var.asp_name}"
  additional_host_name = "${var.external_host_name}"  // need to give proper url
  appinsights_instrumentation_key = "${var.appinsights_instrumentation_key}"
  capacity     = "${var.capacity}"
  common_tags  = "${var.common_tags}"
  asp_rg       = "${var.asp_rg}"

  app_settings = {

    // Logging vars
    REFORM_TEAM = "${var.product}"
    REFORM_SERVICE_NAME = "${var.product}-${var.microservice}"
    REFORM_ENVIRONMENT = "${var.env}"

    // Packages
    PACKAGES_NAME="${var.packages_name}"
    PACKAGES_PROJECT="${var.packages_project}"
    PACKAGES_ENVIRONMENT="${var.packages_environment}"
    PACKAGES_VERSION="${var.packages_version}"

    // Frontend web details
    PUBLIC_PROTOCOL ="${var.pcq_frontend_protocol}"

    // Service name
    SERVICE_NAME = "${var.frontend_service_name}"

    USE_HTTPS =  "${var.pcq_frontend_https}"
//    GA_TRACKING_ID = "${var.pcq_google_track_id}"

    // REDIS
    USE_REDIS = "${var.pcq_frontend_use_redis}"
    REDIS_USE_TLS = "${var.redis_use_tls}"
    REDIS_HOST      = "${module.pcq-frontend-redis-cache.host_name}"
    REDIS_PORT      = "${module.pcq-frontend-redis-cache.redis_port}"
    REDIS_PASSWORD  = "${module.pcq-frontend-redis-cache.access_key}"

    REFORM_ENVIRONMENT = "${var.reform_envirionment_for_test}"

    FEATURE_TOGGLES_API_URL = "${var.feature_toggles_api_url}"

    // Cache
    WEBSITE_LOCAL_CACHE_OPTION = "${var.website_local_cache_option}"
    WEBSITE_LOCAL_CACHE_SIZEINMB = "${var.website_local_cache_sizeinmb}"

    APP_BASE_PATH = "/pcq"
    PCQ_REDIRECT_BASE_URL = "${local.pcq_internal_base_url}"
    EXTERNAL_HOSTNAME_URL = "${var.external_hostName_url}"
    ENABLE_TRACKING = "${var.enable_tracking}"
  }
}
