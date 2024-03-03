start:
	poetry run python -m api.app

clean: ## Remove generated files.
	find . -type f -name '*.py[co]' -delete -o -type d -name __pycache__ -delete


lint: ## Lint all files.
	pre-commit run --all-files

## Docker Instructions

start-docker:
	docker-compose up
