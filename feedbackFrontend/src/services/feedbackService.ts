import type { FeedbackForm } from '../models/feedbackForm';
import { api } from './api';

export const sendFeedback = (form: FeedbackForm) => {
    return api.post('/feedback', form);
};
