# Importieren der notwendigen Module
Install-Module -Name Az -Scope CurrentUser -Repository PSGallery -AllowClobber


# Anmelden bei Azure
Connect-AzAccount

## Wenn es hier zu einem Fehler kommt nutzt auch oftmals Connect-AzAccount -UseDeviceAuthentication

# Einige Variable festlegen
$resourceGroupName = "jtudockerplay"
$location = "westeurope"
$imagename = "tuttas/webchat"
$containerName = "jtucontainer"
$appServicePlaneName = "jtuserviceplan"
$appName = "jtuapp"

# Erstellen einer ResourceGruppe
$rg = Get-AzResourceGroup -Name $resourceGroupName -ErrorVariable err -ErrorAction SilentlyContinue
if ($err) {
    # Resource Group existiert nicht und wird anleget
    $rg = New-AzResourceGroup -Name $resourceGroupName -Location $location
}
$rg


# Starten des Containers
New-AzAppServicePlan -Name $appServicePlaneName -Location $location -ResourceGroupName $resourceGroupName -Tier BasicB1 -Linux
New-AZWebApp -Name $appName -AppServicePlan $appServicePlaneName -Location $location -ResourceGroupName $resourceGroupName -ContainerImageName $imagename -EnableContainerContinuousDeployment

$config = Get-AzResource -ResourceGroupName $resourceGroupName -ResourceType Microsoft.Web/sites/config -ResourceName $appName -ApiVersion 2018-02-01
$config.Properties.linuxFxVersion = "DOCKER|$($imagename):latest"
$config | Set-AzResource -ApiVersion 2018-02-01 -Force

