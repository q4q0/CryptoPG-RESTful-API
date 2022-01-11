interface IUser {
  username: string;
  email: string;
  password: string;
}

// id       Int        @id @default(autoincrement())
// username String     @unique
// email    String     @unique
// password String
// Merchant Merchant[]
// Wallet   Wallet[]
// Payment  Payment[]
