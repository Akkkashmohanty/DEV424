from sqlalchemy import text

from app.db.database import engine

try:
    with engine.connect() as conn:
        conn.execute(text("SELECT 1"))
        print("✅ Connected to Neon Successfully")
except Exception as e:
    print(f"❌ Connection Failed: {e}")