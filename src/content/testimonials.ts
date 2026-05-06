export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  product: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      'We had the idea but zero experience in manufacturing. DreamWay took us from a concept on paper to a fully packaged, production-ready product in under eight weeks. The execution was exactly what we needed.',
    name: 'J. Mitchell',
    role: 'Founder & CEO',
    product: 'Trail Chews',
  },
  {
    quote:
      'I was skeptical about outsourcing product development. But this wasn\'t outsourcing — it was a true operator partnership. Every deadline was hit. The packaging came out better than I imagined.',
    name: 'S. Reyes',
    role: 'Brand Owner',
    product: 'Specialty Food Line',
  },
  {
    quote:
      'No fluff, no wasted meetings. Vrej comes in, understands what needs to get done, and delivers. If you\'re serious about launching a physical product, this is the team you want.',
    name: 'D. Karim',
    role: 'Co-Founder',
    product: 'Consumer Goods Launch',
  },
  {
    quote:
      'From the very first call it was clear DreamWay operates differently. They think like product people, not consultants. Our launch timeline stayed on track and the final product exceeded expectations.',
    name: 'A. Norris',
    role: 'Brand Director',
    product: 'Beverage Line',
  },
];
