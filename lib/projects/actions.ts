import { Project } from "@/lib/types";
import { getAuthToken } from "@/lib/auth/actions";

const base_url = process.env.NEXT_PUBLIC_BACKEND_URL;

export const getProjects = async () => {
  try {
    const token = await getAuthToken();

    const res = await fetch(`${base_url}/membership/projects`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Failed to fetch projects: ${res.status} ${errorText}`);
    }

    const data = await res.json();

    return data;
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw error;
  }
};

export const getProjectById = async (projectID: string) => {
  try {
    const token = await getAuthToken();

    const res = await fetch(`${base_url}/membership/projects/${projectID}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Failed to fetch project: ${res.status} ${errorText}`);
    }

    const data = await res.json();

    return data;
  } catch (error) {
    console.error("Error fetching project:", error);
    throw error;
  }
};

export const createProject = async (project: Omit<Project, "id">) => {
  try {
    const token = await getAuthToken();

    const res = await fetch(`${base_url}/admin/projects/create`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        project,
      }),
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Failed to create project: ${res.status} ${errorText}`);
    }

    const data = await res.json();

    return data;
  } catch (error) {
    console.error("Error creating project:", error);
    throw error;
  }
};

export const updateProject = async (
  projectID: string,
  project: Partial<Omit<Project, "id">>
) => {
  try {
    const token = await getAuthToken();

    const res = await fetch(`${base_url}/admin/projects/${projectID}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        projectID,
        project,
      }),
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Failed to update project: ${res.status} ${errorText}`);
    }

    const data = await res.json();

    return data;
  } catch (error) {
    console.error("Error updating project:", error);
    throw error;
  }
};

export const deleteProject = async (projectID: string) => {
  try {
    const token = await getAuthToken();

    const res = await fetch(`${base_url}/admin/projects/${projectID}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        projectID,
      }),
    });

    if (res.status === 204) {
      return true;
    }

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Failed to delete project: ${res.status} ${errorText}`);
    }

    const data = await res.json();

    return data;
  } catch (error) {
    console.error("Error deleting project:", error);
    throw error;
  }
};
