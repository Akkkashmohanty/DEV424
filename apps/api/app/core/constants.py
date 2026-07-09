"""
FarmGym Global Constants

This file contains business constants shared across
the entire backend.
"""

# ==========================
# XP SYSTEM
# ==========================

XP_PER_TASK = 10

XP_PER_LEVEL = 100


# ==========================
# STREAK SYSTEM
# ==========================

MIN_TASKS_FOR_STREAK = 1


# ==========================
# TASKS
# ==========================

DEFAULT_PRIORITY = "Medium"


TASK_PRIORITIES = (
    "Low",
    "Medium",
    "High",
)


# ==========================
# USER LEVELS
# ==========================

DEFAULT_LEVEL = 1


DEFAULT_XP = 0


DEFAULT_STREAK = 0



from enum import Enum


# ==========================
# ORDER STATUS
# ==========================

class OrderStatus(str, Enum):
    PLACED = "PLACED"
    CONFIRMED = "CONFIRMED"
    PROCESSING = "PROCESSING"
    PACKED = "PACKED"
    SHIPPED = "SHIPPED"
    DELIVERED = "DELIVERED"
    CANCELLED = "CANCELLED"


# ==========================
# PAYMENT STATUS
# ==========================

class PaymentStatus(str, Enum):
    PENDING = "PENDING"
    PAID = "PAID"
    FAILED = "FAILED"
    REFUND_PENDING = "REFUND_PENDING"
    REFUNDED = "REFUNDED"


# ==========================
# PRODUCT CATEGORIES
# ==========================

PRODUCT_CATEGORIES = (
    "Seeds",
    "Plants",
    "Pots",
    "Tools",
    "Compost",
    "Fertilizers",
    "Starter Kits",
    "Accessories",
)


# ==========================
# ORDER LIMITS
# ==========================

DEFAULT_PAGE_SIZE = 10
MAX_PAGE_SIZE = 100