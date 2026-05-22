# deploy.ps1 - 나를읽다 단독 배포 (와이엠은 Phase 1B 이후)
# 사용: .\deploy.ps1 "커밋 메시지"

param([Parameter(Mandatory=$true)][string]$msg)

$ErrorActionPreference = "Stop"
$frontDir = "C:\dev\ymmedia-frontend"
$ghDir = "C:\dev\readmelab.github.io"

Write-Host "`n=== 1/4 빌드 (naread brand) ===" -ForegroundColor Cyan
cd $frontDir
$env:NEXT_PUBLIC_BRAND = "naread"
npm run build
if ($LASTEXITCODE -ne 0) { Write-Error "빌드 실패"; exit 1 }

Write-Host "`n=== 2/4 _next → unsedang/_next 이동 ===" -ForegroundColor Cyan
if (Test-Path "out\_next") {
  if (Test-Path "out\unsedang\_next") { Remove-Item "out\unsedang\_next" -Recurse -Force }
  Move-Item "out\_next" "out\unsedang\_next"
  Write-Host "  -> out\unsedang\_next 이동 완료"
}

Write-Host "`n=== 3/4 readmelab.github.io/unsedang 교체 ===" -ForegroundColor Cyan
if (Test-Path "$ghDir\unsedang") { Remove-Item "$ghDir\unsedang" -Recurse -Force }
Copy-Item "out\unsedang" "$ghDir\unsedang" -Recurse
Write-Host "  -> 복사 완료"

Write-Host "`n=== 4/4 나를읽다 git push (GitHub Pages) ===" -ForegroundColor Cyan
cd $ghDir
git add unsedang
git commit -m $msg
git push
cd $frontDir
Write-Host "  -> push 완료"

Write-Host "`n=== 소스 git push (백업) ===" -ForegroundColor Cyan
git add .
git commit -m $msg
git push
Write-Host "  -> 소스 push 완료"

Write-Host "`n=== 배포 완료 ===" -ForegroundColor Green
Write-Host "  나를읽다: https://readmelab.co.kr/unsedang/j1/  (1~2분 후)"
Write-Host "  와이엠: Phase 1B에서 작업 (현재 후순위)"
