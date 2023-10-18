import { NextRequest } from 'next/server';
import { BlogPost } from '@/types';
import { saveResource, getAllResources } from '@/firebase/actions';
import {
  errorRequestHandler,
  successRequestHandler,
} from '@/utils/requestHandlers';

//TODO: Add validation to requests

export async function POST(request: NextRequest) {
  try {
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
    // Return an error response
    return errorRequestHandler(500, 'Failed to add blog post');
  }
}

export async function GET(request: NextRequest) {
  try {
    const response = await getAllResources<BlogPost>('posts/');
    if (!response) {
      return errorRequestHandler(404, 'No blog posts found');
    }
    return successRequestHandler<BlogPost[]>(response, 200);
  } catch (error) {
    return errorRequestHandler(500, 'Failed to get blog post');
  }
}
