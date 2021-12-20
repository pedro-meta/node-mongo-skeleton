FROM mongo

COPY users.json /users.json
COPY items.json /items.json
CMD mongoimport --host mongodb --db airport-ai --collection items --type json --file /items.json --jsonArray \
    && mongoimport --host mongodb --db airport-ai --collection users --type json --file /users.json --jsonArray