from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.auth.dependencies import get_current_user
from app.auth.jwt import create_access_token
from app.auth.passwords import verify_password
from app.db.database import get_db
from app.repositories.user_repository import UserRepository
from app.schemas.auth import (
    UserLogin,
    TokenResponse,
)
from app.schemas.user import (
    UserCreate,
    UserResponse,
)
from app.services.user_service import UserService

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"],
)


@router.post(
    "/register",
    response_model=UserResponse,
)
def register(
    payload: UserCreate,
    db: Session = Depends(get_db),
):
    repo = UserRepository(db)

    service = UserService(repo)

    try:
        return service.create_user(
            email=payload.email,
            full_name=payload.full_name,
            password=payload.password,
        )

    except ValueError as e:
        raise HTTPException(
            status_code=400,
            detail=str(e),
        )


@router.post(
    "/login",
    response_model=TokenResponse,
)
def login(
    payload: UserLogin,
    db: Session = Depends(get_db),
):
    repo = UserRepository(db)

    user = repo.get_by_email(
        payload.email,
    )

    if not user:
        raise HTTPException(
            status_code=401,
            detail="Invalid credentials",
        )

    if not verify_password(
        payload.password,
        user.hashed_password,
    ):
        raise HTTPException(
            status_code=401,
            detail="Invalid credentials",
        )

    token = create_access_token(
        user.id,
    )

    return {
        "access_token": token,
        "token_type": "bearer",
    }


@router.get(
    "/me",
    response_model=UserResponse,
)
def me(
    current_user=Depends(
        get_current_user,
    ),
):
    return current_user