#!/bin/zsh
function workrlog() {
    local logDir="${HOME}/code/bin/workr"
    mkdir -p "$logDir"
    local logFile="${logDir}/$(date '+%Y-%m-%d_%H-%M-%S').log"
    echo "$@" >> "$logFile"
}

workrlog "$@"

