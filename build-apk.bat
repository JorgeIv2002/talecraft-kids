@echo off
set "JAVA_HOME=C:\Program Files\Microsoft\jdk-21.0.13.21-hotspot"
set "ANDROID_HOME=C:\Users\jorge\AppData\Local\Android\Sdk"
set "PATH=%JAVA_HOME%\bin;%PATH%"

echo [TaleCraft Kids Mobile Packager]
echo Compilando APK nativa de Android con Java 21 LTS...
echo JAVA_HOME: %JAVA_HOME%
echo ANDROID_HOME: %ANDROID_HOME%

cd /d "%~dp0android"
call gradlew.bat assembleDebug
