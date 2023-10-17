import { NextRequest } from 'next/server';
import { BlogPost } from '@/types';
import { saveResource } from '@/firebase/actions';
import {
  errorRequestHandler,
  successRequestHandler,
} from '@/utils/requestHandlers';

//TODO: Add validation to POST request

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
