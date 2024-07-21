import { NextRequest } from 'next/server';
import { BlogPost } from '@/types';
import { saveResource, getAllResources } from '@/firebase/actions';
import {
  errorRequestHandler,
  successRequestHandler
} from '@/utils/requestHandlers';
import { adminApp } from '@/firebase/admin';

/**
 * Handles the POST request for creating a new blog post.
 *
 * @param request - The NextRequest object representing the incoming request.
 * @returns A Promise that resolves to a success response if the blog post is added successfully, or an error response if there is an issue.
 */
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

    const data: BlogPost = await request.json();

    // Save Blog post into DB
    await saveResource<BlogPost>('posts/', data.id, data);

    return successRequestHandler<string>(
      'Successfully Added Blog Post to DB',
      200
    );
  } catch (error) {
    console.log(error);
    return errorRequestHandler(500, 'Failed to add blog post');
  }
}

/**
 * Handles the GET request for retrieving blog posts.
 * @param request - The NextRequest object representing the incoming request.
 * @returns A Promise that resolves to the response for the GET request.
 */
export async function GET(request: NextRequest) {
  try {
    const limit = Number(request.nextUrl.searchParams.get('limit'));
    const lastKey = Number(request.nextUrl.searchParams.get('lastKey'));

    const posts = await getAllResources<BlogPost>('posts/', limit, lastKey);

    if (!posts) {
      return errorRequestHandler(404, 'No blog posts found');
    }

    return successRequestHandler<BlogPost[]>(posts, 200);
  } catch (error) {
    return errorRequestHandler(500, 'Failed to get blog post');
  }
}
