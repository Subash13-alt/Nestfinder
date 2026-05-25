export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-[200px]">
      <div className="relative">
        <div className="w-8 h-8 border-2 border-gray-200 rounded-full"></div>
        <div className="w-8 h-8 border-2 border-gray-900 rounded-full border-t-transparent animate-spin absolute top-0"></div>
      </div>
    </div>
  )
}
