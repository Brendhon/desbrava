import { NextRequest, NextResponse } from 'next/server';
import { Country } from '@/lib/types/country';
import countriesData from '@/public/data/countries.json';

/**
 * GET /api/countries/[name]
 * Get country by name
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { name: string } }
) {
  try {
    const name = params.name;
    
    if (!name) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid name format',
          message: 'Country name is required'
        },
        { status: 400 }
      );
    }

    const country = (countriesData as Country[]).find(c => c.country === name);

    if (!country) {
      return NextResponse.json(
        {
          success: false,
          error: 'Country not found',
          message: `No country found with name ${name}`
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: country
    });

  } catch (error) {
    console.error('Error fetching country by name:', error);
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
