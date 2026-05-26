// lib/query-data.ts

export interface FAQ {
  keywords: string[];
  response: string;
  suggestedQuestions?: string[];
}

export const faqDatabase: FAQ[] = [
  {
    keywords: ['price', 'cost', 'rent', 'budget', 'expensive', 'cheap'],
    response: "🏠 Property prices vary by location, size, and amenities. Most properties range from ₹30 Lakhs to ₹2 Crores. Use the price filter on our listings page to find properties within your budget.",
    suggestedQuestions: ["Show properties under ₹50 Lakhs", "Properties between ₹1-2 Crores"]
  },
  {
    keywords: ['booking', 'book', 'reserve', 'visit', 'schedule'],
    response: "📅 To book a property visit:\n1. Go to property details\n2. Click 'Book Visit'\n3. Select date and time\n4. Confirm booking\nYou'll receive confirmation within 5 minutes.",
    suggestedQuestions: ["What documents are needed?", "Cancellation policy?"]
  },
  {
    keywords: ['document', 'paper', 'registration', 'legal', 'agreement'],
    response: "📋 Required documents: Sale Deed, Tax receipts, Encumbrance Certificate, Khata, RERA registration, approved plan, occupancy certificate.",
    suggestedQuestions: ["How to verify documents?", "Do I need a lawyer?"]
  },
  {
    keywords: ['loan', 'finance', 'emi', 'bank', 'mortgage', 'home loan'],
    response: "🏦 Home Loan: Up to 90% financing, interest from 8.5% p.a., tenure up to 30 years. Partners: SBI, HDFC, ICICI, Axis Bank.",
    suggestedQuestions: ["Loan eligibility?", "Documents for loan?"]
  },
  {
    keywords: ['cancellation', 'refund', 'cancel'],
    response: "🔄 Free cancellation up to 24 hours before visit. 50% refund within 24 hours. No refund for no-show. Cancel from 'My Bookings'.",
    suggestedQuestions: ["How to cancel?", "Refund timeline?"]
  },
  {
    keywords: ['support', 'help', 'issue', 'complaint'],
    response: "🆘 Support: 📞 +91-80-1234-5678 (9AM-9PM) | 📧 support@nestfinder.com | 💬 Live chat on website",
    suggestedQuestions: ["Response time?", "Escalation?"]
  },
  {
    keywords: ['hello', 'hi', 'hey', 'namaste'],
    response: "👋 Hello! Welcome to NestFinder. I can help with property search, bookings, documents, loans, and more. How can I assist?",
    suggestedQuestions: ["How to search properties?", "What is NestFinder?"]
  }
];

export const defaultResponse = {
  answer: "🙏 I'm still learning. Please rephrase your question. Try asking about prices, booking, documents, loans, or cancellation.",
  suggestedQuestions: ["How to book a property?", "What documents needed?", "Home loan options"]
};

export function findBestMatch(query: string): FAQ | null {
  const lowerQuery = query.toLowerCase();
  let bestMatch: FAQ | null = null;
  let maxMatches = 0;
  for (const faq of faqDatabase) {
    let matches = 0;
    for (const keyword of faq.keywords) {
      if (lowerQuery.includes(keyword)) matches++;
    }
    if (matches > maxMatches && matches > 0) {
      maxMatches = matches;
      bestMatch = faq;
    }
  }
  return bestMatch;
}

export function getWelcomeMessage(): string {
  return "👋 Welcome to NestFinder! I'm your virtual assistant. Ask me about properties, bookings, documents, loans, or anything else!";
}