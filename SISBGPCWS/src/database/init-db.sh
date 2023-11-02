#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "postgres" --dbname "postgres" <<-EOSQL
	CREATE USER api_servidores;
    ALTER USER api_servidores PASSWORD 'api_password';
	CREATE DATABASE api_database;
	GRANT ALL PRIVILEGES ON DATABASE api_database TO api_servidores;
EOSQL