#! /bin/bash
prompt="<install-bower-components>"

echo "$prompt Installing bower and resources..."
npm install bower
cd library
bower install
echo "$promt bower and resources are now installed!"