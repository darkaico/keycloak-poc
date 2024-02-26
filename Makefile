start:
	docker-compose up --build --remove-orphans


lint: ## Lint all files.
	pre-commit run --all-files
