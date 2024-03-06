start:
	foreman start -f Procfile.dev

test:
	rails test:system

setup:
	bin/rails db:create
	bin/rails db:migrate

destroy:
	bin/rails db:drop