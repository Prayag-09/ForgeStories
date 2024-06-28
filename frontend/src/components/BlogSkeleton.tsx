export const BlogSkeleton = () => {
    return (
        <div role="status" className="animate-pulse">
            <div className="p-4 border-b border-gray-300 pb-4 max-w-screen-md cursor-pointer">
                <div className="flex items-center mb-2">
                    <div className="h-4 w-4 bg-gray-300 rounded-full mr-2 animate-pulse-shimmer"></div>
                    <div className="h-2 bg-gray-300 rounded-full animate-pulse-shimmer"></div>
                </div>
                <div className="text-xl font-semibold h-6 bg-gray-300 rounded-full animate-pulse-shimmer mb-2"></div>
                <div className="text-md font-thin h-8 bg-gray-300 rounded-full animate-pulse-shimmer mb-2"></div>
                <div className="text-sm font-thin text-gray-500 h-4 bg-gray-300 rounded-full animate-pulse-shimmer mt-4"></div>
            </div>
            <span className="sr-only">Loading...</span>
        </div>
    );
}
