import app from './app';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV}`);
  console.log(`🧩 Database URL: ${process.env.DATABASE_URL}`);
  console.log(`🔐 JWT Secret: ${process.env.JWT_SECRET}`);
});
