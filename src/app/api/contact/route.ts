import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

// In-memory store for demo purposes (resets when serverless function spins down)
let mockContacts: any[] = [];

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { name, phone, service } = data;

    if (!name || !phone || !service) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const contact = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      phone,
      service,
      createdAt: new Date().toISOString(),
    };
    
    mockContacts.unshift(contact);

    return NextResponse.json({ success: true, contact }, { status: 201 });
  } catch (error) {
    console.error('Error creating contact message:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function GET() {
  try {
    return NextResponse.json({ success: true, contacts: mockContacts }, { status: 200 });
  } catch (error) {
    console.error('Error fetching contact messages:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Missing ID' }, { status: 400 });
    }

    mockContacts = mockContacts.filter(c => c.id !== id);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Error deleting contact message:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, name, phone, service } = body;

    if (!id || !name || !phone || !service) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    const index = mockContacts.findIndex(c => c.id === id);
    if (index > -1) {
      mockContacts[index] = { ...mockContacts[index], name, phone, service };
      return NextResponse.json({ success: true, contact: mockContacts[index] }, { status: 200 });
    }

    return NextResponse.json({ error: 'Contact not found' }, { status: 404 });
  } catch (error) {
    console.error('Error updating contact message:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
