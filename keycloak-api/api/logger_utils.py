import logging
import os
from logging.handlers import RotatingFileHandler

from api import BASE_DIR

DEFAULT_LOG_FILE_PATH = f"{BASE_DIR}/logs/api.log"


def setup_logger(log_file_path=DEFAULT_LOG_FILE_PATH):

    logger = logging.getLogger("my_app_logger")
    logger.setLevel(logging.DEBUG)

    formatter = logging.Formatter("%(asctime)s - %(levelname)s - %(message)s")

    console_handler = logging.StreamHandler()
    console_handler.setFormatter(formatter)
    logger.addHandler(console_handler)

    # Log to a local file
    logs_dir = os.path.dirname(log_file_path)
    os.makedirs(logs_dir, exist_ok=True)

    file_handler = RotatingFileHandler(log_file_path, maxBytes=5 * 1024 * 1024, backupCount=2)
    file_handler.setFormatter(formatter)
    logger.addHandler(file_handler)

    return logger
