
# Three-Tier App (Docker, MySQL)

**Frontend (Nginx) → Backend (Node/Express) → Database (MySQL)** with secure, segmented networks:

- `frontend-network`  (web + api)
- `backend-network`   (api only)
- `database-network`  (db + api)

## Quick start

```bash
# 1) Create secret
mkdir -p secrets
echo "S0m3_Str0ng_P@ssw0rd" > secrets/db_password.txt

# 2) Build & run
docker compose up -d --build

# 3) Open the app
open http://localhost:8080  # or use your browser
```

## Test isolation

- Frontend → Backend ✅
- Frontend → DB ❌ (different networks)
- Backend → DB ✅

## Change network CIDR

Docker does not support in-place CIDR changes. Remove and recreate the network with the desired `--subnet`/`--gateway`.
# ThreeTierApplication
