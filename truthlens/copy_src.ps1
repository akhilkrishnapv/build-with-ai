$source = "src"
$destination = "client\src"

Get-ChildItem -Path $source -Recurse | ForEach-Object {
    $targetPathStr = $_.FullName -replace [regex]::Escape((Get-Item .\$source).FullName), ((Get-Item .\$destination).FullName)
    if ($_.PSIsContainer) {
        if (-not (Test-Path $targetPathStr)) {
            New-Item -ItemType Directory -Path $targetPathStr -Force
        }
    } else {
        if (-not (Test-Path $targetPathStr)) {
            Copy-Item -Path $_.FullName -Destination $targetPathStr
        }
    }
}
