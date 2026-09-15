curl -X POST http://localhost:3060/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"imad@example.com","password":"Password123!"}'
{
  "authtoken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUxYTJiM2M0ZDVlNmY3YThiOWMwZDFlIn0sImlhdCI6MTY5NTY0MTYwMH0.xyz987tokenhashsamplevalue123",
  "email": "imad@example.com",
  "firstName": "Imad"
}
