
# Start ngrok
# Assumes you have an ngrok config file
# that exposes ports 3030 and 3000
ngrok start --all

# Ensure docker-compose is running
docker-compose up

# Get resources
curl -v -X GET 'http://localhost:3030/users?$limit=1' | jq .
curl -v -X GET 'http://localhost:3030/leads?$limit=1' | jq .
curl -v -X GET 'http://localhost:3030/messages?$limit=3' | jq .

# Search resources
curl -v -X GET 'http://localhost:3030/leads/?title=access' | jq .

# Create a new Message resource
random=$(pwgen -Bs 10 1)
cat > message.json <<EOF
{
  "created": "$(date -u +"%Y-%m-%dT%H:%M:%SZ")",
  "submitter": "Iskandar Tests",
  "text": "My demo message ${random}."
}
EOF
curl -v -X POST 'http://localhost:3030/messages' \
    -H "Content-Type: application/json" \
    -d @message.json | tee response.json | jq .

# Extract the ID and get the new Message
NEW_ID=$(cat response.json | jq --raw-output ._id)
curl -v -X GET "http://localhost:3030/messages/$NEW_ID" | jq .

# Open it the browser
open http://localhost:3030/messages/$NEW_ID

# Update the new Message
cat > patch.json <<EOF
{
  "submitter": "Iskandar Tests Again"
}
EOF
curl -v -X PATCH "http://localhost:3030/messages/$NEW_ID" \
    -H "Content-Type: application/json" \
    -d @patch.json | jq .

# Here we are supplying a partial object.
# You can also use the PUT verb if you supply a complete object.

# Get the new Message by ID again
curl -v -X GET "http://localhost:3030/messages/$NEW_ID" | jq .

# Search for the new Message
curl -v -X GET "http://localhost:3030/messages/?submitter=again" | jq .

# Delete the new Message
curl -v -X DELETE "http://localhost:3030/messages/$NEW_ID" | jq .

# Let's look at Swagger UI
open http://localhost:3030/docs

# Let's look at the React-Admin UI
open http://localhost:3000