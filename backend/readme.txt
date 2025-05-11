install conda and run this to load the virtual env so that you can run the python code:
conda env create -f environment.yml

If that failed, manually install these packages using pip: flask, flask_cors, openai, typing, pydantic, json

test.py sends a request to openai using part of the apple ToC and prints the response.


Plumbing update:
if conda didn't work, pip install dotenv "pymongo[srv]"

