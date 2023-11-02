import { NextRequest } from 'next/server';
import { BlogPost } from '@/types';
import { saveResource, getAllResources } from '@/firebase/actions';
import {
  errorRequestHandler,
  successRequestHandler
} from '@/utils/requestHandlers';
import { adminApp } from '@/firebase/admin';
import { utils } from '@/utils';

export async function POST(request: NextRequest) {
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

    // Get request body
    const data: BlogPost = await request.json();

    // Save Blog post into DB
    await saveResource<BlogPost>('posts/', data.id, data);

    // Return a success response
    return successRequestHandler<string>(
      'Sucessfully Added Blog Post to DB',
      200
    );
  } catch (error) {
    console.log(error);
    // Return an error response
    return errorRequestHandler(500, 'Failed to add blog post');
  }
}

// Get all posts
export async function GET(request: NextRequest) {
  try {
    const limit = request.nextUrl.searchParams.get('limit') || 3;
    const lastKey = request.nextUrl.searchParams.get('lastKey') || undefined;

    const posts = await getAllResources<BlogPost>(
      'posts/',
      Number(limit),
      Number(lastKey)
    );

    if (!posts) {
      return errorRequestHandler(404, 'No blog posts found');
    }

    return successRequestHandler<BlogPost[]>(posts, 200);
  } catch (error) {
    return errorRequestHandler(500, 'Failed to get blog post');
  }
}
