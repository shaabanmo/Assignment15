import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

export default function PostCardSkeleton({ showImage = true }: { showImage?: boolean }) {
    return <>
        {
            Array.from({ length: 3 }).map((_, i) => (
                <Card key={i} className="container mt-10">
                    <CardHeader>
                        <div className="flex gap-3 justify-between">
                            <div className="flex gap-4">
                                {/* Avatar */}
                                <Skeleton circle width={40} height={40} />

                                {/* Name / username / date */}
                                <div>
                                    <Skeleton width={120} height={14} className="block" />
                                    <Skeleton width={90} height={12} className="block" />
                                    <Skeleton width={70} height={12} />
                                </div>
                            </div>

                            {/* Dropdown button */}
                            <Skeleton width={36} height={36} borderRadius={8} />
                        </div>
                    </CardHeader>

                    <CardContent>
                        {/* Body text */}
                        <Skeleton count={3} className="mb-1" />

                        {/* Post image */}
                        {showImage && <Skeleton height={300} className="mt-3" />}
                    </CardContent>

                    <CardFooter className="justify-between">
                        {[0, 1, 2].map((i) => (
                            <div key={i} className="flex gap-2 items-center">
                                <Skeleton circle width={24} height={24} />
                                <Skeleton width={24} height={16} />
                            </div>
                        ))}
                    </CardFooter>
                </Card>
            ))
        }
    </>







}