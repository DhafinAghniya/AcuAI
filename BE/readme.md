# Authentication API Documentation

API untuk manajemen registrasi dan login pengguna menggunakan JWT (JSON Web Token) dengan MySQL dan Sequelize

## Daftar Isi

- [Persyaratan](#persyaratan)
- [Instalasi](#instalasi)
- [Konfigurasi](#konfigurasi)
- [Endpoint](#endpoint)
- [Registrasi User](#registrasi-user)
- [Login User](#login-user)

## Persyaratan

- Node.js v18+
- MySQL 8.0+

## Instalasi

1. Install dependencies:
   npm install

2. Install dependencies development:
   npm install -D nodemon

## Konfigurasi

1. Buat file `.env` di root folder:
   DB_HOST=localhost
   DB_NAME=
   DB_USER=root
   DB_PASSWORD=
   JWT_SECRET=
   PORT=3000

2. Jalankan MySQL dan buat database:
   CREATE DATABASE nama_db;

3. Sync database dengan Sequelize:
   npm run dev

_Model otomatis akan tercreate saat server pertama kali dijalankan_

## Endpoint

### Registrasi User

**URL**: `POST /api/auth/register`

**Request Body**:
{
"email": "user@example.com",
"password": "password123"
}

**Response Sukses (201 Created)**:
{
"status": "success",
"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
"user": {
"id": 1,
"email": "user@example.com"
}
}

**Response Error**:

- 400 Bad Request (Email sudah terdaftar)
  {
  "status": "error",
  "message": "Email sudah terdaftar"
  }

### Login User

**URL**: `POST /api/auth/login`

**Request Body**:
{
"email": "user@example.com",
"password": "password123"
}

**Response Sukses (200 OK)**:
{
"status": "success",
"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
"user": {
"id": 1,
"email": "user@example.com"
}
}

**Response Error**:

- 401 Unauthorized (Kredensial salah)
  {
  "status": "error",
  "message": "Email atau password salah"
  }
