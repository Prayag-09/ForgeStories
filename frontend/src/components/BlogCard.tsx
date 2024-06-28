import { Link } from "react-router-dom";

interface BlogCardProps {
    authorName: string;
    title: string;
    content: string;
    publishedDate?: string;
    id: number;
}

export const BlogCard = ({
    id,
    authorName,
    title,
    content
}: BlogCardProps) => {
    const publishedDate = new Date().toLocaleDateString();
    return (
        <Link to={`/blog/${id}`} className="text-black">
            <div className="p-4 border-b border-gray-300 pb-4 max-w-screen-md cursor-pointer">
                <div className="flex items-center mb-2">
                    <Avatar name={authorName} />
                    <div className="font-bold text-sm ml-2">{authorName}</div>
                    <Circle />
                    <div className="font-medium text-sm ml-2 text-gray-500">
                        {publishedDate}
                    </div>
                </div>
                <div className="text-xl font-bold mb-2">
                    {title}
                </div>
                <div className="text-md mb-2">
                    {content.slice(0, 100) + "..."}
                </div>
                <div className="text-gray-500 text-sm">
                    {`${Math.ceil(content.length / 100)} minute(s) read`}
                </div>
            </div>
        </Link>
    );
}

export function Circle() {
    return <div className="h-1 w-1 rounded-full bg-gray-500 ml-2"></div>;
}

interface AvatarProps {
    name: string;
    size?: "small" | "big";
    photo?: string;
}

export function Avatar({ name, size = "small", photo }: AvatarProps) {
    const initials = name.split(" ").map((part) => part[0]).join("");
    const avatarSize = size === "small" ? "w-6 h-6" : "w-10 h-10";

    return (
        <div className={`relative inline-flex items-center justify-center overflow-hidden bg-gray-600 rounded-full ${avatarSize}`}>
            {photo ? (
                <img
                    src={photo}
                    alt={`Avatar of ${name}`}
                    className="absolute inset-0 object-cover w-full h-full rounded-full"
                />
            ) : (
                <span className={`${size === "small" ? "text-xs" : "text-md"} font-extralight text-gray-600 dark:text-gray-300`}>
                    {initials}
                </span>
            )}
        </div>
    );
}

