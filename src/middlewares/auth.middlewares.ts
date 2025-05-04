import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';


  
const authenticateToken = (req: Request, res: Response, next: NextFunction): void =>  {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) {
    res.status(401).json({ message: 'Authorization token missing' });
    return;
  }
  
  jwt.verify(token, process.env.JWT_SECRET as string, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
    if (user && typeof user !== 'string' && 'id' in user) {
      req.user = user as { id: string };
    } else {
      return res.status(403).json({ message: 'Invalid token payload' });
    }
    next();
  });
};
export default authenticateToken;
