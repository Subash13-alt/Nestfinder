export default function HeroStats() {
  return (
    <dl className="mt-7 grid grid-cols-2 gap-4 border-t border-gray-200 pt-6 sm:grid-cols-4 lg:mt-10 lg:gap-5 lg:pt-8">
      <div>
        <dt className="font-display text-3xl font-bold">15,000+</dt>
        <dd className="text-sm font-medium text-gray-500">Properties</dd>
      </div>
      <div>
        <dt className="font-display text-3xl font-bold">8,200+</dt>
        <dd className="text-sm font-medium text-gray-500">Happy clients</dd>
      </div>
      <div>
        <dt className="font-display text-3xl font-bold">340+</dt>
        <dd className="text-sm font-medium text-gray-500">Agents</dd>
      </div>
      <div>
        <dt className="font-display text-3xl font-bold">4.9★</dt>
        <dd className="text-sm font-medium text-gray-500">Avg. rating</dd>
      </div>
    </dl>
  )
}
