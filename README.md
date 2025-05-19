# Express API

Repositori ini dibuat untuk kebutuhan backend dengan menggunakan Express.js, TypeScript, dan MySQL.

## Deskripsi

API backend yang dibangun dengan Node.js dan Express.js framework menggunakan TypeScript untuk type safety dan MySQL sebagai database.

## Struktur Proyek

```
express-api/
├── src/                    # Direktori utama source code
│   ├── config/             # Konfigurasi aplikasi dan database
│   ├── controllers/        # Controller untuk menangani request dan response
│   ├── middlewares/        # Middleware seperti authentication, error handling
│   ├── models/             # Model database dan definisi tipe
│   ├── repositories/       # Repository untuk akses data
│   ├── routes/             # Definisi routing API
│   ├── services/           # Business logic
│   ├── utils/              # Fungsi utilitas
│   └── app.ts              # Konfigurasi Express app
├── tests/                  # Unit dan integration tests
├── .env                    # Environment variables
├── .eslintrc.js            # Konfigurasi ESLint
├── .gitignore              # File yang diabaikan Git
├── .prettierrc             # Konfigurasi Prettier
├── package.json            # Dependensi dan scripts
├── server.ts               # Entry point aplikasi
└── tsconfig.json           # Konfigurasi TypeScript
```

## Prasyarat

- Node.js (versi 16.x atau lebih baru)
- MySQL (versi 8.x)
- npm atau yarn

## Instalasi

1. Clone repositori ini:
   ```bash
   git clone https://github.com/Hanif404/express-api.git
   cd express-api
   ```

2. Install dependensi:
   ```bash
   npm install
   ```

3. Buat file `.env` di root proyek:
   ```
   PORT=3000
   NODE_ENV=development
   
   # Database
   DB_HOST=localhost
   DB_PORT=3306
   DB_USER=root
   DB_PASSWORD=password
   DB_NAME=express_api_db
   
   # JWT
   JWT_SECRET=your_jwt_secret_key
   JWT_EXPIRES_IN=1d
   ```

4. Setup database MySQL:
   ```bash
   # Buat database
   mysql -u root -p -e "CREATE DATABASE express_api_db;"
   ```

## Menjalankan Aplikasi

### Development Mode

```bash
npm run start:dev
```

### Production Mode

```bash
npm run build
npm run start:prod
```

## API Endpoints

### User API

- `GET /api/user/v1` - Mendapatkan semua user
- `GET /api/user/v1/:id` - Mendapatkan user berdasarkan ID
- `POST /api/user/v1` - Membuat user baru
- `PUT /api/user/v1/:id` - Mengupdate user
- `DELETE /api/user/v1/:id` - Menghapus user

## Teknologi yang Digunakan

- **Express.js**: Web framework untuk Node.js
- **TypeScript**: JavaScript dengan type checking
- **MySQL**: Database relasional
- **dotenv**: Mengelola environment variables
- **ESLint & Prettier**: Code linting dan formatting
- **Nodemon**: Auto-restart server saat development

## Pengembangan

### Menambahkan Route Baru

1. Buat controller baru di `src/controllers/`
2. Buat router baru di `src/routes/`
3. Daftarkan router di `src/app.ts`

### Menambahkan Model Baru

1. Buat interface model di `src/models/`
2. Buat repository untuk model di `src/repositories/`
3. Buat service untuk business logic di `src/services/`

## Testing

```bash
npm test
```

## Linting

```bash
npm run lint
```

## Kontribusi

1. Fork repositori
2. Buat branch fitur (`git checkout -b feature/amazing-feature`)
3. Commit perubahan (`git commit -m 'Add some amazing feature'`)
4. Push ke branch (`git push origin feature/amazing-feature`)
5. Buat Pull Request

## Lisensi

ISC

## Author

Hanif Kharismadini