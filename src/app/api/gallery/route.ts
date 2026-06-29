import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

// In-memory store for demo purposes
let mockImages = [
  {
    id: '1',
    url: 'https://images.unsplash.com/photo-1614200187524-dc4b892acf16?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    altText: 'Demo Image 1',
    createdAt: new Date().toISOString()
  }
];

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // Since we are mocking the filesystem write, we won't actually save the file bytes.
    // We will just generate a mock image object. 
    // In a real application, you'd upload this to S3, Cloudinary, etc.
    const image = {
      id: Math.random().toString(36).substr(2, 9),
      // Using a placeholder image for demo since we can't save files on Netlify read-only filesystem
      url: 'https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      altText: file.name,
      createdAt: new Date().toISOString()
    };
    
    mockImages.unshift(image);

    return NextResponse.json({ success: true, image }, { status: 201 });
  } catch (error) {
    console.error('Error uploading gallery image:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function GET() {
  try {
    return NextResponse.json({ success: true, images: mockImages }, { status: 200 });
  } catch (error) {
    console.error('Error fetching gallery images:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
