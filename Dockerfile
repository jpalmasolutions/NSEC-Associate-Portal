FROM public.ecr.aws/docker/library/python:3.9

WORKDIR /nsec-associate-portal

RUN pip install pipenv
COPY Pipfile .
RUN pipenv install
COPY src/ src/
COPY json/ json/
RUN export PYTHON_PATH=${PYTHON_PATH}:${PWD}