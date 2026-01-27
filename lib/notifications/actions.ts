"use server";

import { getAuthToken } from "../auth/actions";

const base_url = process.env.BACKEND_URL;

export const getNotifications = async () => {
  try {
    const token = await getAuthToken();

    const res = await fetch(`${base_url}/notifications`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(
        `Failed to get notifications: ${res.status} ${errorText}`,
      );
    }

    const data = await res.json();

    return data;
  } catch (error) {
    console.error("Error getting notifications:", error);
    throw error;
  }
};

export const markRead = async (notification_id: string) => {
  try {
    const token = await getAuthToken();

    const res = await fetch(`${base_url}/notifications/${notification_id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ notification: { read: true } }),
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(
        `Failed to mark notification as read: ${res.status} ${errorText}`,
      );
    }

    const data = await res.json();

    return data;
  } catch (error) {
    console.error("Error marking notification as read:", error);
    throw error;
  }
};

export const markUnread = async (notification_id: string) => {
  try {
    const token = await getAuthToken();

    const res = await fetch(`${base_url}/notifications/${notification_id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ notification: { read: false } }),
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(
        `Failed to mark notification as unread: ${res.status} ${errorText}`,
      );
    }

    const data = await res.json();

    return data;
  } catch (error) {
    console.error("Error marking notification as unread:", error);
    throw error;
  }
};

export const deleteNotification = async (notification_id: string) => {
  try {
    const token = await getAuthToken();

    const res = await fetch(`${base_url}/notifications/${notification_id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(
        `Failed to delete notification: ${res.status} ${errorText}`,
      );
    }

    const data = await res.json();

    return data;
  } catch (error) {
    console.error("Error deleting notification:", error);
    throw error;
  }
};
