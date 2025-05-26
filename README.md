# Express API

Repositori ini dibuat untuk kebutuhan backend dengan menggunakan Express.js, TypeScript, dan MySQL.

## Deskripsi

API backend yang dibangun dengan Node.js dan Express.js framework menggunakan TypeScript untuk type safety dan MySQL sebagai database. Proyek ini mengimplementasikan arsitektur clean code dengan pemisahan layer (controllers, services, repositories) untuk memudahkan maintenance dan pengembangan.

## Struktur Proyek

```
express-api/
├── prisma/                 # Konfigurasi dan migrasi Prisma ORM
│   ├── migrations/         # File migrasi database
│   └── schema.prisma       # Schema database Prisma
├── src/                    # Direktori utama source code
│   ├── config/             # Konfigurasi aplikasi dan database
│   ├── domain/             # Domain layer (Clean Architecture)
│   │   ├── entities/       # Definisi entitas bisnis
│   │   ├── repositories/   # Interface repository
│   │   └── services/       # Service interfaces
│   ├── interfaces/         # Interface layer
│   │   ├── controllers/    # Controller untuk menangani request dan response
│   │   ├── middlewares/    # Middleware seperti authentication, error handling
│   │   └── routes/         # Definisi routing API
│   ├── repositories/       # Implementasi repository
│   ├── types/              # Type definitions
│   ├── usecase/            # Use case / business logic
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

### Authentication API

- `POST /auth/register` - Registrasi user baru
- `POST /auth/login` - Login user

## Teknologi yang Digunakan

- **Express.js**: Web framework untuk Node.js
- **TypeScript**: JavaScript dengan type checking
- **MySQL**: Database relasional
- **dotenv**: Mengelola environment variables
- **ESLint & Prettier**: Code linting dan formatting
- **Nodemon**: Auto-restart server saat development
- **JWT**: JSON Web Token untuk autentikasi
- **Prisma**: ORM untuk MySQL
- **Jest**: Framework untuk unit testing

## Pengembangan

### Menambahkan Route Baru

1. Buat controller baru di `src/interfaces/controllers/`
2. Buat router baru di `src/interfaces/routes/`
3. Daftarkan router di `src/app.ts`

### Menambahkan Model Baru

1. Buat entity di `src/domain/entities/`
2. Buat interface repository di `src/domain/repositories/`
3. Buat implementasi repository di `src/repositories/`
4. Buat use case di `src/usecase/`

### Koneksi Database

Koneksi database diatur menggunakan Prisma ORM di `src/config/prisma.ts`. Konfigurasi database didefinisikan dalam file `prisma/schema.prisma`.

```typescript
// src/config/prisma.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default prisma;
```

```prisma
// prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

// Definisi model database
model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String?
  password  String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

### Middleware Authentication

Middleware untuk autentikasi dapat ditambahkan di `src/interfaces/middlewares/`:

```typescript
// Contoh middleware autentikasi
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Authentication required' });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};
```

## Testing

```bash
npm test
```

### Contoh Unit Test

```typescript
// Contoh test dengan Jest
import request from 'supertest';
import app from '../src/app';

describe('User API', () => {
  it('should get all users', async () => {
    const res = await request(app).get('/api/user/v1');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });
});
```

## Linting

```bash
npm run lint
```

## Deployment

### Docker

Proyek ini dapat di-deploy menggunakan Docker. Berikut contoh `Dockerfile`:

```dockerfile
FROM node:16-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["node", "dist/server.js"]
```

### CI/CD

Untuk continuous integration dan deployment, dapat menggunakan GitHub Actions atau GitLab CI/CD.

## Kontribusi

1. Fork repositori
2. Buat branch fitur (`git checkout -b feature/amazing-feature`)
3. Commit perubahan (`git commit -m 'Add some amazing feature'`)
4. Push ke branch (`git push origin feature/amazing-feature`)
5. Buat Pull Request

## Best Practices

- Gunakan TypeScript strict mode untuk type safety
- Implementasikan error handling yang konsisten
- Validasi input request menggunakan middleware
- Gunakan environment variables untuk konfigurasi
- Implementasikan logging untuk debugging
- Gunakan transaction untuk operasi database yang kompleks
- Buat dokumentasi API dengan Swagger/OpenAPI

## Lisensi

ISC

## Author

Hanif Kharismadini

## Versi

1.0.0 - Initial release