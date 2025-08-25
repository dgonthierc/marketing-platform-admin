import { NextRequest, NextResponse } from 'next/server';
import { clientQueries } from '@/lib/db/queries';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const metrics = await clientQueries.getMetrics(params.id);
    
    if (!metrics) {
      return NextResponse.json(
        { success: false, error: 'Cliente no encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json({ 
      success: true, 
      data: metrics 
    });
  } catch (error) {
    console.error('Error fetching client metrics:', error);
    return NextResponse.json(
      { success: false, error: 'Error al obtener métricas del cliente' },
      { status: 500 }
    );
  }
}