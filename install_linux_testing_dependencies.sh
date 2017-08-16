#! /bin/bash
prompt="<headless-browser-installer>"

echo "$prompt This will install the headless browser testing resources..."

read -r -p "$prompt Are you sure? [y/N] " response
if [[ "$response" =~ ^([yY][eE][sS]|[yY])+$ ]]
then
    echo "$prompt Here we go..."
    echo "$prompt Downloading Chrome..."
    wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
    echo "$prompt Updating system..."
    sudo apt-get update
    echo "$prompt Installing Chrome..."
    sudo dpkg -i google-chrome-stable_current_amd64.deb
    echo "$prompt Installing other dependencies..."
    sudo apt-get install fonts-liberation libappindicator1 xdg-utils
    echo "$prompt Reconciling installed dependencies..."
    sudo apt-get install -f
    echo "$prompt Installing firefox runner..."
    sudo apt-get install firefox xvfb
    echo "$prompt All done! tests should run now using [ npm test ] !"
else
    echo "$prompt Headless browser testing resources were NOT installed!"
fi