# List customers
https://simplify-qr-node.herokuapp.com/customers

# Create customer
curl -H "Content-Type: application/json" -X POST -d '{"name":"John Doe","email":"john.doe@email.com", "card": {"number": "5555555555554444", "expMonth": 12, "expYear": 19}}' https://simplify-qr-node.herokuapp.com/addCustomer

# Make payments
# Make sure the id, referenced here is what we got from the last call
curl -H "Content-Type: application/json" -X POST -d '{"amount":155,"customer":"AXd7r98z", "description": "Test payment from node instance"}' https://simplify-qr-node.herokuapp.com/pay

#List payments
https://simplify-qr-node.herokuapp.com/payments

