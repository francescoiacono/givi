import { NextRequest } from 'next/server';
import { getResource } from '@/firebase/actions';
import { BlogPost } from '@/types';
import {
  errorRequestHandler,
  successRequestHandler,
} from '@/utils/requestHandlers';

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
