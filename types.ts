import React from 'react';

export interface BlogPostSection {
  id: string;
  title: string;
  content: React.ReactNode;
}

export interface TaxCalculation {
  income: number;
  taxableIncome: number;
  estimatedTax: number;
}