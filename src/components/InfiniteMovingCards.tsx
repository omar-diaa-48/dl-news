import { cn } from '@/utilities/helpers/cn';
import { IStableCoin } from '@/utilities/interfaces';
import React, { ReactNode, useEffect, useState } from 'react'

interface Props {
    items: Array<IStableCoin>;
    direction?: "left" | "right";
    pauseOnHover?: boolean;
    renderItem: (item: any) => ReactNode
}

const InfiniteMovingCards: React.FC<Props> = (props) => {
    const { items, direction = "left", pauseOnHover = true, renderItem } = props

    const containerRef = React.useRef<HTMLDivElement>(null);
    const scrollRef = React.useRef<HTMLUListElement>(null);

    useEffect(() => {
        addAnimation();
    }, []);

    const [start, setStart] = useState(false);

    const addAnimation = () => {
        if (containerRef.current && scrollRef.current) {
            const scrollContent = Array.from(scrollRef.current.children);

            scrollContent.forEach((item) => {
                const duplicatedItem = item.cloneNode(true);
                if (scrollRef.current) {
                    scrollRef.current.appendChild(duplicatedItem);
                }
            });

            getDirection();
            getSpeed();
            setStart(true);
        }
    }

    const getDirection = () => {
        if (containerRef.current) {
            const animationDirection = direction === "left" ? "forwards" : "reverse"
            containerRef.current.style.setProperty(
                "--animation-direction",
                animationDirection
            );
        }
    };

    const getSpeed = () => {
        if (containerRef.current) {
            const timeForCardInView = 5
            const durationTime = items.length * timeForCardInView
            containerRef.current.style.setProperty("--animation-duration", `${durationTime}s`);
        }
    };

    return (
        <div
            ref={containerRef}
            className="overflow-x-hidden w-full bg-[#E7E7E7]"
        >
            <ul
                ref={scrollRef}
                className={cn(
                    "flex min-w-full gap-12 py-4 w-max ",
                    start && "animate-scroll ",
                    pauseOnHover && "hover:[animation-play-state:paused]"
                )}
            >
                {items.map((item) => (
                    renderItem(item)
                ))}
            </ul>
        </div>
    )
}

export default InfiniteMovingCards