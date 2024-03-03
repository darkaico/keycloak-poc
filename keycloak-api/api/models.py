import logging

from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Column, Integer, String
from sqlalchemy.orm.exc import MultipleResultsFound, NoResultFound

db = SQLAlchemy()


class User(db.Model):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String)
    username = Column(String)
    email = Column(String)


class Item(db.Model):
    __tablename__ = "items"
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String)


def verify_user(token: dict):
    try:
        user = db.session.query(User).filter(User.email == token["email"]).one()
    except NoResultFound:
        user = User(email=token["email"], name=token["name"], username=token["preferred_username"])
        db.session.add(user)
        db.session.commit()
    except MultipleResultsFound:
        logging.error(f"Multiple users found for email: {token['email']}")
        # Handle multiple users with the same email (if this is not expected)
    except Exception as e:
        logging.error(f"Error while verifying user: {e}")
        # Handle other exceptions (log, raise, or handle as appropriate)
    finally:
        db.session.close()
