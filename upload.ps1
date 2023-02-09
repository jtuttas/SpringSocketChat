# Importieren der notwendigen Module
Install-Module -Name Az -Scope CurrentUser -Repository PSGallery -AllowClobber


# Anmelden bei Azure
Connect-AzAccount

# Einige Variable festlegen
$resourceGroupName = "jtudockerplay"
$location = "westeurope"
$imagename = "tuttas/webchat:latest"
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
New-AzAppServicePlan -Name $appServicePlaneName -Location $location -ResourceGroupName $resourceGroupName -Tier Free -Linux
New-AzWebApp -Name $appName -AppServicePlan $appServicePlaneName -Location $location -ResourceGroupName $resourceGroupName -ContainerImageName $image -EnableContainerContinuousDeployment













Register-AzResourceProvider -ProviderNamespace Microsoft.ContainerInstance

$port1 = New-AzContainerInstancePortObject -Port 8080 -Protocol TCP
$container = New-AzContainerInstanceObject -Name $containerName -Image $imagename -RequestCpu 1 -RequestMemoryInGb 1.5 -Port @($port1)
$containerGroup = New-AzContainerGroup -ResourceGroupName $resourceGroupName -Name "mycontainergroup" -Location $location -Container $container -OsType Linux -RestartPolicy "Never" -IpAddressType Public 
$cg = Get-AzContainerGroup -ResourceGroupName $resourceGroupName
Write-Host "Access Container: http://$($cg.IPAddressIP):8080"

# Abfragen des Webhooks


$containername="testcontainer02"
$dnsNameLabel="testdns02"
$OSType="Linux"
$image ="tuttas/webcaht:latest"
#New-AzureRmResourceGroup -Name $ResourceGroup -Location $location
New-AzWebApp -ResourceGroupName $resourceGroupName -Name "jtuazwebapp" -Location $location -AppServicePlan "ContosoServicePlan" -

New-AzWebApp -ResourceGroupName $resourceGroupName -Name "jtudockertest" -ContainerImageName $image  -EnableContainerContinuousDeployment -ContainerRegistryUrl "docker.io" 
