# Deploy

## code

```
# python
# 更新依赖库
pip3 freeze > requirements.txt
pip3 install -r requirements.txt
```
## Docker Install

```bash
# install ubuntu
sudo docker run -d -t  ubuntu:22.04
# 容器内
apt update
apt install git -y
git config --global user.name "max"
git config --global user.email "tongweizj@gmail.com"
git clone git@github.com:tongweizj/smart_fund_tracker.git

# install postgresql
docker run --name postgres-db -e TZ=america/toronto -e POSTGRES_USER=root -e POSTGRES_DB=database -e POSTGRES_PASSWORD=password -p 5432:5432 -v pgdata:/var/lib/postgresql/data -d postgres

```