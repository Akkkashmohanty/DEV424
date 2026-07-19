import { UserRole } from "@/types/auth.types"

export const ROLE_PERMISSIONS: Record<UserRole, string[]> = {
    USER: [
        "dashboard",
        "planner",
        "marketplace",
        "learning",
        "community",
        "donation",
        "gym",
        "profile",
        "settings",
    ],

    FARMER: [
        "dashboard",
        "planner",
        "marketplace",
        "learning",
        "community",
        "donation",
        "gym",
        "profile",
        "settings",
    ],

    SELLER: [
        "dashboard",
        "seller",
        "products",
        "orders",
        "analytics",
        "profile",
        "settings",
    ],

    CREATOR: [
        "dashboard",
        "creator",
        "courses",
        "uploads",
        "analytics",
        "profile",
        "settings",
    ],

    ADMIN: [
        "*",
    ],
}

export function hasPermission(
    role: UserRole,
    permission: string,
) {
    const permissions = ROLE_PERMISSIONS[role]

    return (
        permissions.includes("*") ||
        permissions.includes(permission)
    )
}