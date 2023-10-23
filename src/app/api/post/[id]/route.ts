import { NextRequest } from 'next/server';
import { deleteResource, getResource, saveResource } from '@/firebase/actions';
import { BlogPost } from '@/types';
import {
  errorRequestHandler,
  successRequestHandler,
} from '@/utils/requestHandlers';
import { adminApp } from '@/firebase/admin';

interface Params {
  params: {
    id: string;
  };
}

export const GET = async (_req: NextRequest, { params }: Params) => {
  try {
    // Get id from params
    const { id } = params;

    // Get blog post from DB
    const data = await getResource<BlogPost>('posts/', id);

    // Check if data is null and return a 404 response
    if (!data) {
      return errorRequestHandler(404, 'Blog post not found');
    }

    // Return a success response
    return successRequestHandler<BlogPost>(data, 200);
  } catch (error) {
    // Return an error response
    return errorRequestHandler(500, 'Failed to retrieve blog post');
  }
};

// Update post route
export const PUT = async (request: NextRequest, { params }: Params) => {
  try {
    // Get id from params
    const { id } = params;

    // Get the token from the request headers
    const authorization = request.headers.get('Authorization');
    const token = authorization?.replace('Bearer ', '');

    if (!token?.trim()) {
      return errorRequestHandler(401, 'Unauthorized');
    }

    // Verify the token using Firebase
    const decodedToken = await adminApp()
      .auth()
      .verifyIdToken(token)
      .catch(() => {});

    if (!decodedToken) {
      return errorRequestHandler(401, 'Invalid token');
    }

    const data: BlogPost = await request.json();

    // Update blog post in DB
    await saveResource<BlogPost>('posts/', id, data);

    // Return a success response
    return successRequestHandler('Blog post updated', 200);
  } catch (error) {
    return errorRequestHandler(500, 'Failed to update blog post');
  }
};

export const DELETE = async (request: NextRequest, { params }: Params) => {
  try {
    // Get the token from the request headers
    const authorization = request.headers.get('Authorization');
    const token = authorization?.replace('Bearer ', '');

    if (!token?.trim()) {
      return errorRequestHandler(401, 'Unauthorized');
    }

    // Verify the token using Firebase
    const decodedToken = await adminApp()
      .auth()
      .verifyIdToken(token)
      .catch(() => {});

    if (!decodedToken) {
      return errorRequestHandler(401, 'Invalid token');
    }

    // Get id from params
    const { id } = params;

    // Delete blog post from DB
    const isDeleted = await deleteResource('posts', id);

    if (isDeleted) {
      // Success
      return successRequestHandler('Blog post deleted', 200);
    } else {
      // 404 Response
      return errorRequestHandler(404, 'Blog post not found');
    }
  } catch (error) {
    // 500 Response (server)
    return errorRequestHandler(500, 'Failed to delete blog post');
  }
};
