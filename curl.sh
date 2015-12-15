
# Create customer
curl -H "Content-Type: application/json" -X POST -d '{"name":"John Doe","email":"john.doe@email.com", "token": "6ed97f6e-7fcc-464f-9edf-2be6f205706c"}' http://localhost:5000/addCustomer

# List customers
https://simplify-qr-node.herokuapp.com/customers

# Make payments
# Make sure the id, referenced here is what we got from the last call
curl -H "Content-Type: application/json" -X POST -d '{"amount":155,"customer":"rga7r949", "description": "Test payment from node instance"}' http://localhost:5000/pay

#List payments
https://simplify-qr-node.herokuapp.com/payments

