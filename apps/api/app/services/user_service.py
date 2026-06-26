from app.auth.passwords import hash_password
from app.models.user import User
from app.repositories.user_repository import UserRepository


class UserService:
    def __init__(self, repo: UserRepository):
        self.repo = repo

    def create_user(
        self,
        email: str,
        full_name: str,
        password: str,
    ):
        existing_user = self.repo.get_by_email(email)

        if existing_user:
            raise ValueError(
                "User already exists"
            )

        user = User(
            email=email,
            full_name=full_name,
            hashed_password=hash_password(password),
        )

        return self.repo.create(user)

    def get_user_by_email(
        self,
        email: str,
    ):
        return self.repo.get_by_email(email)

    def get_user_by_id(
        self,
        user_id: int,
    ):
        return self.repo.get_by_id(user_id)