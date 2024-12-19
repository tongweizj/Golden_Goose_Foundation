# 安装发布手册

## 环境

### Postgresql

```bash
docker pull postgres
docker run -d \
	--name lab-postgres \
  -p 5432:5432 \
	-e POSTGRES_PASSWORD=mysecretpassword \
	postgres

```

```

```