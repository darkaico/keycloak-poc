start:
	poetry run python app.py

lint: ## Lint all files.
	poetry run pre-commit run --all-files

clean: ## Remove generated files.
	find . -type f -name '*.py[co]' -delete -o -type d -name __pycache__ -delete