start:
	poetry run python api/app.py --port

lint: ## Lint all files.
	poetry run pre-commit run --files .

clean: ## Remove generated files.
	find . -type f -name '*.py[co]' -delete -o -type d -name __pycache__ -delete

## Docker Instructions

start-docker:
	docker-compose up
