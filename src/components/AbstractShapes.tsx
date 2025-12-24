import { motion } from "framer-motion";

// Reusable abstract shapes for decorative purposes
export const CircleShape = ({
                                className = "",
                                size = 24,
                                color = "primary",
                                animate = false
                            }: {
    className?: string;
    size?: number;
    color?: "primary" | "secondary" | "accent" | "fun-purple" | "fun-yellow" | "fun-pink";
    animate?: boolean;
}) => {
    const colorMap = {
        primary: "bg-primary",
        secondary: "bg-secondary",
        accent: "bg-accent",
        "fun-purple": "bg-fun-purple",
        "fun-yellow": "bg-fun-yellow",
        "fun-pink": "bg-fun-pink",
    };

    return (
        <motion.div
            className={`rounded-full ${colorMap[color]} ${className}`}
            style={{ width: size, height: size }}
            animate={animate ? { scale: [1, 1.1, 1], opacity: [0.7, 1, 0.7] } : {}}
            transition={animate ? { duration: 3, repeat: Infinity, ease: "easeInOut" } : {}}
        />
    );
};

export const DonutShape = ({
                               className = "",
                               size = 48,
                               color = "primary",
                               strokeWidth = 4,
                               animate = false
                           }: {
    className?: string;
    size?: number;
    color?: "primary" | "secondary" | "accent" | "fun-purple" | "fun-yellow" | "fun-pink";
    strokeWidth?: number;
    animate?: boolean;
}) => {
    const colorMap = {
        primary: "border-primary",
        secondary: "border-secondary",
        accent: "border-accent",
        "fun-purple": "border-fun-purple",
        "fun-yellow": "border-fun-yellow",
        "fun-pink": "border-fun-pink",
    };

    return (
        <motion.div
            className={`rounded-full ${colorMap[color]} ${className}`}
            style={{
                width: size,
                height: size,
                borderWidth: strokeWidth,
                borderStyle: "solid"
            }}
            animate={animate ? { rotate: 360 } : {}}
            transition={animate ? { duration: 20, repeat: Infinity, ease: "linear" } : {}}
        />
    );
};

export const SquareShape = ({
                                className = "",
                                size = 24,
                                color = "secondary",
                                rounded = 8,
                                animate = false
                            }: {
    className?: string;
    size?: number;
    color?: "primary" | "secondary" | "accent" | "fun-purple" | "fun-yellow" | "fun-pink";
    rounded?: number;
    animate?: boolean;
}) => {
    const colorMap = {
        primary: "bg-primary",
        secondary: "bg-secondary",
        accent: "bg-accent",
        "fun-purple": "bg-fun-purple",
        "fun-yellow": "bg-fun-yellow",
        "fun-pink": "bg-fun-pink",
    };

    return (
        <motion.div
            className={`${colorMap[color]} ${className}`}
            style={{
                width: size,
                height: size,
                borderRadius: rounded
            }}
            animate={animate ? { rotate: [0, 45, 0], scale: [1, 1.1, 1] } : {}}
            transition={animate ? { duration: 4, repeat: Infinity, ease: "easeInOut" } : {}}
        />
    );
};

export const TriangleShape = ({
                                  className = "",
                                  size = 24,
                                  color = "accent",
                                  direction = "up",
                                  animate = false
                              }: {
    className?: string;
    size?: number;
    color?: "primary" | "secondary" | "accent" | "fun-purple" | "fun-yellow" | "fun-pink";
    direction?: "up" | "down" | "left" | "right";
    animate?: boolean;
}) => {
    const colorMap = {
        primary: "hsl(var(--primary))",
        secondary: "hsl(var(--secondary))",
        accent: "hsl(var(--accent))",
        "fun-purple": "hsl(var(--fun-purple))",
        "fun-yellow": "hsl(var(--fun-yellow))",
        "fun-pink": "hsl(var(--fun-pink))",
    };

    const rotationMap = {
        up: 0,
        right: 90,
        down: 180,
        left: 270,
    };

    return (
        <motion.div
            className={className}
            style={{
                width: 0,
                height: 0,
                borderLeft: `${size / 2}px solid transparent`,
                borderRight: `${size / 2}px solid transparent`,
                borderBottom: `${size}px solid ${colorMap[color]}`,
                transform: `rotate(${rotationMap[direction]}deg)`,
            }}
            animate={animate ? { y: [0, -10, 0] } : {}}
            transition={animate ? { duration: 2.5, repeat: Infinity, ease: "easeInOut" } : {}}
        />
    );
};

export const StarShape = ({
                              className = "",
                              size = 32,
                              color = "fun-yellow",
                              animate = false
                          }: {
    className?: string;
    size?: number;
    color?: "primary" | "secondary" | "accent" | "fun-purple" | "fun-yellow" | "fun-pink";
    animate?: boolean;
}) => {
    const colorMap = {
        primary: "hsl(var(--primary))",
        secondary: "hsl(var(--secondary))",
        accent: "hsl(var(--accent))",
        "fun-purple": "hsl(var(--fun-purple))",
        "fun-yellow": "hsl(var(--fun-yellow))",
        "fun-pink": "hsl(var(--fun-pink))",
    };

    return (
        <motion.svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill={colorMap[color]}
            className={className}
            animate={animate ? { rotate: [0, 360], scale: [1, 1.2, 1] } : {}}
            transition={animate ? { duration: 6, repeat: Infinity, ease: "easeInOut" } : {}}
        >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </motion.svg>
    );
};

export const ZigzagLine = ({
                               className = "",
                               width = 100,
                               color = "primary",
                               animate = false
                           }: {
    className?: string;
    width?: number;
    color?: "primary" | "secondary" | "accent" | "fun-purple" | "fun-yellow" | "fun-pink";
    animate?: boolean;
}) => {
    const colorMap = {
        primary: "hsl(var(--primary))",
        secondary: "hsl(var(--secondary))",
        accent: "hsl(var(--accent))",
        "fun-purple": "hsl(var(--fun-purple))",
        "fun-yellow": "hsl(var(--fun-yellow))",
        "fun-pink": "hsl(var(--fun-pink))",
    };

    return (
        <motion.svg
            width={width}
            height={20}
            viewBox="0 0 100 20"
            className={className}
            animate={animate ? { x: [0, 10, 0] } : {}}
            transition={animate ? { duration: 3, repeat: Infinity, ease: "easeInOut" } : {}}
        >
            <path
                d="M0 10 L10 2 L20 18 L30 2 L40 18 L50 2 L60 18 L70 2 L80 18 L90 2 L100 10"
                stroke={colorMap[color]}
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </motion.svg>
    );
};

export const WavyLine = ({
                             className = "",
                             width = 120,
                             color = "secondary",
                             animate = false
                         }: {
    className?: string;
    width?: number;
    color?: "primary" | "secondary" | "accent" | "fun-purple" | "fun-yellow" | "fun-pink";
    animate?: boolean;
}) => {
    const colorMap = {
        primary: "hsl(var(--primary))",
        secondary: "hsl(var(--secondary))",
        accent: "hsl(var(--accent))",
        "fun-purple": "hsl(var(--fun-purple))",
        "fun-yellow": "hsl(var(--fun-yellow))",
        "fun-pink": "hsl(var(--fun-pink))",
    };

    return (
        <motion.svg
            width={width}
            height={24}
            viewBox="0 0 120 24"
            className={className}
            animate={animate ? { scaleX: [1, 1.1, 1] } : {}}
            transition={animate ? { duration: 4, repeat: Infinity, ease: "easeInOut" } : {}}
        >
            <path
                d="M0 12 Q15 0, 30 12 T60 12 T90 12 T120 12"
                stroke={colorMap[color]}
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
            />
        </motion.svg>
    );
};

export const CrossShape = ({
                               className = "",
                               size = 24,
                               color = "fun-pink",
                               animate = false
                           }: {
    className?: string;
    size?: number;
    color?: "primary" | "secondary" | "accent" | "fun-purple" | "fun-yellow" | "fun-pink";
    animate?: boolean;
}) => {
    const colorMap = {
        primary: "hsl(var(--primary))",
        secondary: "hsl(var(--secondary))",
        accent: "hsl(var(--accent))",
        "fun-purple": "hsl(var(--fun-purple))",
        "fun-yellow": "hsl(var(--fun-yellow))",
        "fun-pink": "hsl(var(--fun-pink))",
    };

    return (
        <motion.svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            className={className}
            animate={animate ? { rotate: [0, 180, 360] } : {}}
            transition={animate ? { duration: 8, repeat: Infinity, ease: "linear" } : {}}
        >
            <path
                d="M12 2v20M2 12h20"
                stroke={colorMap[color]}
                strokeWidth="4"
                strokeLinecap="round"
            />
        </motion.svg>
    );
};

export const HexagonShape = ({
                                 className = "",
                                 size = 40,
                                 color = "accent",
                                 filled = true,
                                 animate = false
                             }: {
    className?: string;
    size?: number;
    color?: "primary" | "secondary" | "accent" | "fun-purple" | "fun-yellow" | "fun-pink";
    filled?: boolean;
    animate?: boolean;
}) => {
    const colorMap = {
        primary: "hsl(var(--primary))",
        secondary: "hsl(var(--secondary))",
        accent: "hsl(var(--accent))",
        "fun-purple": "hsl(var(--fun-purple))",
        "fun-yellow": "hsl(var(--fun-yellow))",
        "fun-pink": "hsl(var(--fun-pink))",
    };

    return (
        <motion.svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            className={className}
            animate={animate ? { rotate: [0, 60, 0] } : {}}
            transition={animate ? { duration: 5, repeat: Infinity, ease: "easeInOut" } : {}}
        >
            <polygon
                points="12,2 22,8.5 22,15.5 12,22 2,15.5 2,8.5"
                fill={filled ? colorMap[color] : "none"}
                stroke={colorMap[color]}
                strokeWidth={filled ? 0 : 2}
            />
        </motion.svg>
    );
};

// Floating Shapes Background Component
export const FloatingShapes = ({ className = "" }: { className?: string }) => {
    return (
        <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
            {/* Circles */}
            <CircleShape
                className="absolute top-[10%] left-[5%] opacity-30"
                size={16}
                color="primary"
                animate
            />
            <CircleShape
                className="absolute top-[60%] right-[8%] opacity-25"
                size={24}
                color="fun-purple"
                animate
            />
            <CircleShape
                className="absolute bottom-[20%] left-[15%] opacity-20"
                size={12}
                color="secondary"
                animate
            />

            {/* Donuts */}
            <DonutShape
                className="absolute top-[25%] right-[12%] opacity-30"
                size={40}
                color="accent"
                strokeWidth={3}
                animate
            />
            <DonutShape
                className="absolute bottom-[35%] left-[8%] opacity-25"
                size={32}
                color="fun-pink"
                strokeWidth={2}
                animate
            />

            {/* Squares */}
            <SquareShape
                className="absolute top-[45%] left-[20%] opacity-25"
                size={20}
                color="fun-yellow"
                rounded={4}
                animate
            />
            <SquareShape
                className="absolute bottom-[15%] right-[20%] opacity-20"
                size={16}
                color="primary"
                rounded={2}
                animate
            />

            {/* Triangles */}
            <TriangleShape
                className="absolute top-[15%] right-[25%] opacity-30"
                size={18}
                color="secondary"
                direction="up"
                animate
            />
            <TriangleShape
                className="absolute bottom-[40%] right-[5%] opacity-20"
                size={14}
                color="fun-purple"
                direction="down"
                animate
            />

            {/* Stars */}
            <StarShape
                className="absolute top-[35%] left-[3%] opacity-40"
                size={24}
                color="fun-yellow"
                animate
            />
            <StarShape
                className="absolute bottom-[10%] right-[30%] opacity-30"
                size={20}
                color="accent"
                animate
            />

            {/* Cross */}
            <CrossShape
                className="absolute top-[70%] left-[25%] opacity-20"
                size={18}
                color="fun-pink"
                animate
            />

            {/* Hexagons */}
            <HexagonShape
                className="absolute top-[5%] left-[40%] opacity-25"
                size={28}
                color="accent"
                filled={false}
                animate
            />
        </div>
    );
};

// Decorative shape cluster for cards
export const ShapeCluster = ({
                                 position = "top-right",
                                 scale = 1
                             }: {
    position?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
    scale?: number;
}) => {
    const positionClasses = {
        "top-right": "top-0 right-0 translate-x-1/4 -translate-y-1/4",
        "top-left": "top-0 left-0 -translate-x-1/4 -translate-y-1/4",
        "bottom-right": "bottom-0 right-0 translate-x-1/4 translate-y-1/4",
        "bottom-left": "bottom-0 left-0 -translate-x-1/4 translate-y-1/4",
    };

    return (
        <div
            className={`absolute ${positionClasses[position]} pointer-events-none opacity-40`}
            style={{ transform: `scale(${scale})` }}
        >
            <CircleShape className="absolute" size={32} color="primary" />
            <DonutShape className="absolute -top-4 left-6" size={24} color="secondary" strokeWidth={2} />
            <TriangleShape className="absolute top-6 -left-2" size={16} color="accent" />
            <StarShape className="absolute -top-2 left-12" size={16} color="fun-yellow" />
        </div>
    );
};

export default FloatingShapes;
