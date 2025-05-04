import { Request, Response, NextFunction } from 'express';
import prisma from '../config/db';
declare global {
    namespace Express {
      interface Request {
        user: {
          id: string;
        };
      }
    }
}

// Create Payment Link
export const createpaymentLink = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { title, description, amount, currency } = req.body;
    const userId = req.user.id;

    const newLink = await prisma.paymentLink.create({
      data: { title, description, amount, currency, userId },
    });

    res.status(201).json(newLink);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
    next(error);
  }
};

// Get All Payment Links
export const getAllpaymentLinks = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.user.id;

    const links = await prisma.paymentLink.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });

    res.status(200).json(links);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch payment links' });
    next(error); 
  }
};

// Get Payment Link by ID
export const getpaymentLinkById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const link = await prisma.paymentLink.findUnique({
      where: { id },
    });

    if (!link || link.userId !== userId) {
      res.status(404).json({ error: 'Payment link not found' });
      return;
    }

    res.status(200).json(link);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching link' });
    next(error);
  }
};

// Update Payment Link
export const updatepaymentLink = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const { title, description, amount, currency } = req.body;
    const userId = req.user.id;

    // Check if link exists and belongs to the user
    const existingLink = await prisma.paymentLink.findUnique({ where: { id } });

    if (!existingLink || existingLink.userId !== userId) {
      res.status(404).json({ error: 'Payment link not found or unauthorized' });
      return;
    }

    const updatedLink = await prisma.paymentLink.update({
      where: { id },
      data: { title, description, amount, currency },
    });

    res.status(200).json(updatedLink);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update payment link' });
    next(error); 
  }
};

// Delete Payment Link
export const deletepaymentLink = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const existingLink = await prisma.paymentLink.findUnique({ where: { id } });

    if (!existingLink || existingLink.userId !== userId) {
        res.status(404).json({ error: 'Payment link not found or unauthorized' });
        return;
    }

    await prisma.paymentLink.delete({ where: { id } });

    res.status(200).json({ message: 'Payment link deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete payment link' });
    next(error);
  }
};