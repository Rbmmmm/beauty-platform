import type { Activity, ActivityCreateData, ActivityUpdateData, PaginatedResponse } from '@/types/activity';
import { apiClient } from '@/services/api';

export const activityService = {
  async getActivities(): Promise<PaginatedResponse<Activity>> {
    const res = await apiClient.get('activities/');
    return res.data;
  },
  async getActivity(id: number): Promise<Activity> {
    const res = await apiClient.get(`activities/${id}/`);
    return res.data;
  },
  async createActivity(data: ActivityCreateData): Promise<Activity> {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('description', data.description);
    if (data.cover_image) formData.append('cover_image', data.cover_image);
    if (data.tags) data.tags.forEach(tagId => formData.append('tags', String(tagId)));
    const res = await apiClient.post('activities/', formData);
    return res.data;
  },
  async updateActivity(id: number, data: ActivityUpdateData): Promise<Activity> {
    const formData = new FormData();
    if (data.title) formData.append('title', data.title);
    if (data.description) formData.append('description', data.description);
    if (data.cover_image) formData.append('cover_image', data.cover_image);
    if (data.tags) data.tags.forEach(tagId => formData.append('tags', String(tagId)));
    const res = await apiClient.patch(`activities/${id}/`, formData);
    return res.data;
  },
  async deleteActivity(id: number): Promise<void> {
    await apiClient.delete(`activities/${id}/`);
  },
}; 