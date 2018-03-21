echo 'export NODE_ENV=production' >> ~/.bashrc
echo 'export APP_TYPE=main' >> ~/.bashrc
source ~/.bashrc
sudo apt-get update
sudo apt-get install wget -y
wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.32.1/install.sh | bash
source ~/.bashrc
nvm install 6.6.0
nvm alias default v6.6.0
sudo npm install -g pm2
pm2 startup systemd
sudo su -c "env PATH=$PATH:/usr/bin pm2 startup systemd -u ubuntu --hp /home/ubuntu"
