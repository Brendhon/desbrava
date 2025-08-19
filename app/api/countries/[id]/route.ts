import { NextRequest, NextResponse } from 'next/server';
import { Country } from '@/lib/types/country';
import countriesData from '@/public/data/countries.json';

/**
 * GET /api/countries/[id]
 * Get country by ID
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    
    if (isNaN(id)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid ID format',
          message: 'Country ID must be a number'
        },
        { status: 400 }
      );
    }

    const country = (countriesData as Country[]).find(c => c.id === id);

    if (!country) {
      return NextResponse.json(
        {
          success: false,
          error: 'Country not found',
          message: `No country found with ID ${id}`
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: country
    });

  } catch (error) {
    console.error('Error fetching country by ID:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
        message: 'Failed to fetch country'
      },
      { status: 500 }
    );
  }
}
