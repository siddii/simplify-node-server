# Create customer
curl -H "Content-Type: application/json" -X POST -d '{"name":"John Doe","email":"john.doe@email.com", "card": {"number": "5555555555554444", "expMonth": 12, "expYear": 19}}' http://localhost:5000/addCustomer

# Make payments
curl -H "Content-Type: application/json" -X POST -d '{"amount":155,"customer":"AXd7r98z", "description": "Test payment from node instance"}' http://localhost:5000/pay
