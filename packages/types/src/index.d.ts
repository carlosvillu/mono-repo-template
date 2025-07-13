export interface User {
    id: string;
    email: string;
    name: string;
    avatar?: string;
    role: UserRole;
    createdAt: Date;
    updatedAt: Date;
}
export declare enum UserRole {
    USER = "user",
    ADMIN = "admin",
    MODERATOR = "moderator"
}
export interface ApiResponse<T = unknown> {
    data: T;
    message?: string;
    success: boolean;
    error?: string;
}
export interface PaginatedResponse<T = unknown> extends ApiResponse<T[]> {
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}
export interface BaseEntity {
    id: string;
    createdAt: Date;
    updatedAt: Date;
}
export interface LoadingState {
    isLoading: boolean;
    error?: string;
}
export type ComponentVariant = "primary" | "secondary" | "success" | "warning" | "error"
export type ComponentSize = "sm" | "md" | "lg" | "xl"
export interface ButtonProps {
    variant?: ComponentVariant;
    size?: ComponentSize;
    disabled?: boolean;
    loading?: boolean;
    children: any;
    onClick?: () => void;
}
//# sourceMappingURL=index.d.ts.map