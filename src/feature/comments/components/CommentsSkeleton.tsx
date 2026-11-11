// comments-skeleton.tsx
// One component, `CommentsSkeleton`, mirroring the layout of <Comments />.
// Install: npm i react-loading-skeleton

import Skeleton, { SkeletonTheme } from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"

export function CommentsSkeleton() {
    return (
        // SkeletonTheme sets colors for light/dark. Adjust to match your theme
        // (e.g. hsl(var(--muted)) if your variables hold raw hsl values).
        <SkeletonTheme baseColor="var(--muted)" highlightColor="var(--accent)">
            <section className="space-y-6" aria-busy="true" aria-label="Loading comments">
                {/* ---------- Title + separator ---------- */}
                <div className="space-y-4">
                    <Skeleton width={110} height={20} />
                    <Skeleton height={1} />
                </div>

                {/* ---------- Write box ---------- */}
                <div className="flex gap-3">
                    <Skeleton circle width={36} height={36} />
                    <div className="flex-1 space-y-2">
                        <Skeleton height={80} borderRadius={8} />
                        <div className="flex justify-end gap-2">
                            <Skeleton width={64} height={32} borderRadius={8} />
                            <Skeleton width={84} height={32} borderRadius={8} />
                        </div>
                    </div>
                </div>

                {/* ---------- Comment 1 (with a nested reply) ---------- */}
                <div className="flex gap-3">
                    <Skeleton circle width={36} height={36} />
                    <div className="flex-1 space-y-1">
                        <div className="flex items-baseline gap-2">
                            <Skeleton width={90} height={14} />
                            <Skeleton width={50} height={12} />
                        </div>
                        <Skeleton height={14} />
                        <Skeleton height={14} width="60%" />
                        <div className="flex gap-2 pt-1">
                            <Skeleton width={40} height={20} />
                            <Skeleton width={40} height={20} />
                        </div>

                        {/* Nested reply */}
                        <div className="mt-3 border-l pl-4">
                            <div className="flex gap-3">
                                <Skeleton circle width={28} height={28} />
                                <div className="flex-1 space-y-1">
                                    <div className="flex items-baseline gap-2">
                                        <Skeleton width={70} height={14} />
                                        <Skeleton width={50} height={12} />
                                    </div>
                                    <Skeleton height={14} width="45%" />
                                    <div className="flex gap-2 pt-1">
                                        <Skeleton width={40} height={20} />
                                        <Skeleton width={40} height={20} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ---------- Comment 2 ---------- */}
                <div className="flex gap-3">
                    <Skeleton circle width={36} height={36} />
                    <div className="flex-1 space-y-1">
                        <div className="flex items-baseline gap-2">
                            <Skeleton width={80} height={14} />
                            <Skeleton width={50} height={12} />
                        </div>
                        <Skeleton height={14} />
                        <Skeleton height={14} width="75%" />
                        <div className="flex gap-2 pt-1">
                            <Skeleton width={40} height={20} />
                            <Skeleton width={40} height={20} />
                        </div>
                    </div>
                </div>

                {/* ---------- Comment 3 ---------- */}
                <div className="flex gap-3">
                    <Skeleton circle width={36} height={36} />
                    <div className="flex-1 space-y-1">
                        <div className="flex items-baseline gap-2">
                            <Skeleton width={100} height={14} />
                            <Skeleton width={50} height={12} />
                        </div>
                        <Skeleton height={14} width="55%" />
                        <div className="flex gap-2 pt-1">
                            <Skeleton width={40} height={20} />
                            <Skeleton width={40} height={20} />
                        </div>
                    </div>
                </div>
            </section>
        </SkeletonTheme>
    )
}