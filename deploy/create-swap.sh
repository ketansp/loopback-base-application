sudo swapon -s
free -m
df -h
sudo fallocate -l 4G /swapfile
ls -lh /swapfile
sudo chmod 600 /swapfile
ls -lh /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
sudo swapon -s
sudo bash -c 'echo "/swapfile   none    swap    sw    0   0" >> /etc/fstab'
