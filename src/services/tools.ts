/* eslint-disable import/prefer-default-export */
import { post } from '@/api/pangu_http';

export const pnrAnalyzer = (pnr: string) =>
  post('/core/api/tools/pnr/analyzer', { pnr });
