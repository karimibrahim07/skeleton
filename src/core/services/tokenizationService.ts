import crypto from 'crypto';

export const tokenize = (creditCardNumber: string): string => {
  const hash = crypto.createHash('sha256');
  hash.update(creditCardNumber + process.env.TOKENIZATION_SECRET);
  return hash.digest('hex');
};

export const detokenize = (token: string): string => {
  // In a real system, this would lookup the original number in a secure database
  throw new Error('Detokenization not implemented');
};