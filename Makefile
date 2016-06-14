builddocker:
	docker build -t repl_build:latest -f Dockerfile-build .

ID=$(shell docker images -q repl_build)

rundocker:
	    docker run -d --name repl_build -it $(ID) bash

mv_files:
	docker cp repl_build:/usr/src/repl/build/umd build/umd

build_repl:
	docker build -t repl:latest .

killdocker:
	docker stop repl_build
	docker rm repl_build

start_repl: builddocker rundocker mv_files build_repl killdocker
