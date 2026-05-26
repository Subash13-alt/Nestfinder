import { NextRequest, NextResponse } from 'next/server';
import { findBestMatch, defaultResponse, faqDatabase } from '@/lib/query-data';

export async function POST(request: NextRequest) {
  try {
    const { message, history } = await request.json();
    
    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }
    
    const query = message.toLowerCase().trim();
    
    // Find best matching answer
    const match = findBestMatch(query);
    
    if (match) {
      return NextResponse.json({
        response: match.response,
        suggestedQuestions: match.suggestedQuestions || [],
        confidence: 'high',
      });
    }
    
    // Check if query contains property-related terms
    const propertyTerms = ['property', 'house', 'apartment', 'villa', 'plot', 'land'];
    const hasPropertyTerm = propertyTerms.some(term => query.includes(term));
    
    if (hasPropertyTerm) {
      return NextResponse.json({
        response: "I can help you find properties! Could you please tell me more about what you're looking for? (e.g., budget, location, number of bedrooms)",
        suggestedQuestions: ["Show me properties under ₹50 lakhs", "2 BHK flats near metro", "Properties for rent"],
        confidence: 'medium',
      });
    }
    
    // Default response
    return NextResponse.json({
      response: defaultResponse.answer,
      suggestedQuestions: defaultResponse.suggestedQuestions,
      confidence: 'low',
    });
    
  } catch (error) {
    console.error('Chatbot error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// GET - Get FAQ list (for quick replies)
export async function GET() {
  const quickReplies = faqDatabase.slice(0, 6).map(faq => ({
    question: faq.suggestedQuestions?.[0] || faq.keywords[0],
    keywords: faq.keywords,
  }));
  
  return NextResponse.json({ quickReplies });
}