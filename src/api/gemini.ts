import { GeminiPlaylistRecommendation } from '../models/spotify.model';
import axios from './axiosInstance';

export const askGeminiEmotion = async (
  prompt: string
): Promise<GeminiPlaylistRecommendation> => {
  const res = await axios.post('/gemini/chat', { prompt });
  return res.data.result;
};
